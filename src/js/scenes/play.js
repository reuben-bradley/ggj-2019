import config from '../config/config';

import Person from '../actors/Person';
import Control from '../ui/control';

import dummyStageImg from 'assets/dummy-stage.png';
import danceSprites from 'assets/dance-ss-small-2.png';

import popMp3 from 'assets/audio/pop.mp3';
import popOpus from 'assets/audio/pop.opus';
import synthwaveMp3 from 'assets/audio/synthwave.mp3';
import synthwaveOpus from 'assets/audio/synthwave.opus';

const TINT_BLACK = Phaser.Display.Color.HexStringToColor('0x666666');
const TINT_RED = Phaser.Display.Color.HexStringToColor('0xffaaaa');
const TINT_BLUE = Phaser.Display.Color.HexStringToColor('0xaaaaff');
const TINT_PURPLE = Phaser.Display.Color.HexStringToColor('0xff99ff');

const mergeColors = (color1, color2) => {
  let r = Math.floor(Math.abs(color1.red - color2.red) / 2) + Math.min(color1.red, color2.red);
  let g = Math.floor(Math.abs(color1.green - color2.green) / 2) + Math.min(color1.green, color2.green);
  let b = Math.floor(Math.abs(color1.blue - color2.blue) / 2) + Math.min(color1.blue, color2.blue);
  return new Phaser.Display.Color(r, g, b);
};

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play'});
  }

  preload() {
    this.load.image('dummy-stage', dummyStageImg);
    this.load.audio('pop', [popMp3, popOpus]);
    this.load.audio('synthwave', [synthwaveMp3, synthwaveOpus]);
    this.load.spritesheet('dance-ss-small', danceSprites, {
      frameWidth: 104,
      frameHeight: 160
    });

    console.log('PLAY', this);
  }

  create() {
    const frames = this.anims.generateFrameNumbers('dance-ss-small');
    console.log('frames', frames);

    this.anims.create({
        key: 'dance',
        frames: 'dance-ss-small',
        frameRate: 1,
        repeat: -1
    });

    this.setupStage();
    this.setupAudio();
    this.setupSpawnLocations();
    this.setupParty();
    this.setupControls();
    this.startTheParty();
  }

  onStateChange( prefName, newState ) {
    this.doStageTint();
  }

  setupStage = () => {
    this.stageBg = this.add.image(
      this.sys.canvas.width * 0.5,
      this.sys.canvas.height * 0.5,
      'dummy-stage'
    );
    this.stageBg.setScale(0.45);
  };

  setupSpawnLocations = () => {
    this.personLocations = [];
    const xmin = 100;
    const xmax = 700;
    const xspace = ((xmax - xmin) / config.maxPersons) >> 0;
    for (let i = 0; i < config.maxPersons; i++) {
      const pos = {
        x: xmin + (xspace * i),
        y: Phaser.Math.RND.integerInRange(400, 500)
      }
      this.personLocations.push(pos);
    }
    this.personLocations = Phaser.Utils.Array.Shuffle(this.personLocations);
  };

  setupParty = () => {
    this.partyState = {};
    for ( let pref in config.partyPrefs ) {
      this.partyState[pref] = config.partyPrefs[pref][0];
    }

    this.partyPrefNames = Object.keys(this.partyState);
    this.partyPeople = [];
  };

  setupAudio = () => {
    /* Sets up the audio tracks that can be played in the background.
     * Trigger changes in the audio playing with changeAudio().
     */
    const soundConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.iPod = new Map();
    this.iPod.set('pop', this.sound.add('pop', soundConfig));
    this.iPod.set('synthwave', this.sound.add('synthwave', soundConfig));
  }

  changeAudio = (newTrack) => {
    /* Stops all tracks and plays one defined by newTrack. */
    for (var track of this.iPod.values()) {
      track.stop();
    }

    this.iPod.get(newTrack).play();
  }

  setupControls = () => {
    this.controls = {};
    this.partyPrefNames.forEach((prefName, idx) => {
      const ctrl = new Control(
        this,
        25 + (idx * 200),
        550,
        prefName,
        this.partyState[prefName],
        () => {
          let prefIndex = config.partyPrefs[prefName].indexOf(this.partyState[prefName]);
          prefIndex = (prefIndex + 1) % config.partyPrefs[prefName].length;
          this.partyState[prefName] = config.partyPrefs[prefName][prefIndex];
          this.onStateChange(prefName, this.partyState[prefName]);
          return this.partyState[prefName];
        }
      );
      this.controls[prefName] = ctrl;
      this.add.existing(ctrl);
    });
  };

  startTheParty = () => {
    this.doStageTint();
    this.partyTickTimer = this.time.addEvent({
      delay: config.partyTickTime,
      callback: this.doPartyTic,
      loop: true
    });

    this.personSpawnTimer = this.time.addEvent({
      delay: config.newPersonSpawnTime,
      callback: this.addNewRandomPerson,
      loop: true
    });

    this.addNewRandomPerson();
  };

  addNewRandomPerson = () => {
    if (this.partyPeople.length === config.maxPersons) return false;

    const specificPref = Phaser.Utils.Array.GetRandom(this.partyPrefNames);
    const prefValue = config.partyPrefs[specificPref][Phaser.Math.RND.integerInRange(0, config.partyPrefs[specificPref].length)];

    this.addPartyPerson(
      this.personLocations.pop(),
      {
        [specificPref]: prefValue
      }
    );
  };

  addPartyPerson = (startingPos, prefs) => {
    const newPerson = new Person(this, startingPos, prefs);
    this.add.existing(newPerson);
    this.partyPeople.push(newPerson);
  };

  doPartyTic = () => {
    this.partyPeople.forEach(
      (person) => person.doPartyTic(this.partyState)
    );
  };

  doStageTint = () => {
    let tints = [];
    tints.push(TINT_PURPLE);
    // Tint the stage based on heat and light settings
    if ( this.partyState['light'] == 'ambience' ) {
      tints.push(TINT_BLACK);
    }
    if ( this.partyState['heat'] == 'hot' ) {
      tints.push(TINT_RED);
    }
    else if ( this.partyState['heat'] == 'cold' ) {
      tints.push(TINT_BLUE);
    }

    // Combine all the tints before applying them to the stage
    let resultingTint = tints.shift();
    let newTint;
    while ( newTint = tints.shift() ) {
      resultingTint = mergeColors(resultingTint, newTint);
    }
    this.stageBg.setTint(resultingTint.color);
  };
}
