import config from '../config/config';

import Person from '../actors/Person';
import Control from '../ui/control';

import dummyStageImg from 'assets/dummy-stage.png';
import danceSprites from 'assets/dance-ss-small-2.png';

import popMp3 from 'assets/audio/pop.mp3';
import popOpus from 'assets/audio/pop.opus';
import synthwaveMp3 from 'assets/audio/synthwave.mp3';
import synthwaveOpus from 'assets/audio/synthwave.opus';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play'});
  }

  preload() {
    this.load.image('dummy-stage', dummyStageImg);
    this.load.image('person', personImg);
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
    this.partyState = {
      heat: 0,
      light: 0,
      volume: 0,
      music: 'pop'
    };

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
        100 + (idx * 100),
        550,
        prefName,
        this.partyState[prefName],
        () => {
          this.partyState[prefName] = this.partyState[prefName] === 0 ? 1 : 0;
          return this.partyState[prefName];
        }
      );
      this.controls[prefName] = ctrl;
      this.add.existing(ctrl);
    });
  };

  startTheParty = () => {
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
    const prefValue = Phaser.Math.RND.integerInRange(0, 1);

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
}
