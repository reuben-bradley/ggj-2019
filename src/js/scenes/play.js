import config from '../config/config';

import Person from '../actors/Person';
import Control from '../ui/control';

import dummyStageImg from 'assets/dummy-stage.png';
import danceSprites from 'assets/dance-ss-small-2.png';

import popMp3 from 'assets/audio/pop.mp3';
import popOpus from 'assets/audio/pop.opus';
import rockMp3 from 'assets/audio/rock.mp3';
import rockOpus from 'assets/audio/rock.opus';
import synthwaveMp3 from 'assets/audio/synthwave.mp3';
import synthwaveOpus from 'assets/audio/synthwave.opus';

const STAGE_TINT_DARK = Phaser.Display.Color.HexStringToColor('0x666666');
const STAGE_TINT_RED = Phaser.Display.Color.HexStringToColor('0xffaaaa');
const STAGE_TINT_BLUE = Phaser.Display.Color.HexStringToColor('0xaaaaff');
const STAGE_TINT_PURPLE = Phaser.Display.Color.HexStringToColor('0xff99ff');

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
    this.load.audio('rock', [rockMp3, rockOpus]);
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
    this.changeAudio('pop');
    this.setupParty();
    this.setupClock();
    this.setupControls();
    this.startTheParty();
  }

  onStateChange( prefName, newState ) {
    this.doStageTint();
    if(prefName == 'music'){
        this.changeAudio(newState);
    }
  }

  setupClock = () => {
    this.clockTimer = this.time.addEvent({
      delay: config.partyTickTime,
      repeat: config.partyDuration - 1,
      timeScale: config.partySpeedFactor,
      callback: this.stopTheParty
    });
    this.graphics = this.add.graphics({ x: 0, y: 0 });
    this.clockSize = 75;
  };

  setupStage = () => {
    this.stageBg = this.add.image(
      this.sys.canvas.width * 0.5,
      this.sys.canvas.height * 0.5,
      'dummy-stage'
    );
    this.scoreText = this.add.text(0, 0, `Score: 0`, config.textStyles.score);
    this.scoreText.setOrigin(0);
  };

  getSpawnLocation = () => {
    var loc = {
      x: Phaser.Math.RND.integerInRange(100, 760),
      y: Phaser.Math.RND.integerInRange(400, 500)
    }
    return loc;
  };

  setupParty = () => {
    this.partyState = {};
    for ( let pref in config.partyPrefs ) {
      this.partyState[pref] = config.partyPrefs[pref][0];
    }
    this.partyState.cumulativeScore = 0;
    this.partyState.peopleGained = 0;
    this.partyState.peopleLost = 0;

    this.partyPrefNames = Object.keys(config.partyPrefs);
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
    this.iPod.set('rock', this.sound.add('rock', soundConfig));
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

  stopTheParty = () => {
    if ( this.clockTimer.getOverallProgress() >= 1 ) {
      // Party's over, punks!
      console.log('Party\'s Over!', this.partyState);
      this.partyTickTimer.destroy();
      this.personSpawnTimer.destroy();
    }
  };

  addNewRandomPerson = () => {
    var prefs = {};

    this.partyPrefNames.forEach(function(pref) {
      const prefValue = config.partyPrefs[pref][Phaser.Math.RND.integerInRange(0, config.partyPrefs[pref].length)];

      prefs[pref] = prefValue;
    });

    // TODO retry until we get a position at least <X>px away from other patrons
    var spawnLocation = this.getSpawnLocation();

    this.addPartyPerson(
      spawnLocation,
      prefs
    );
  };

  addPartyPerson = (startingPos, prefs) => {
    const newPerson = new Person(this, startingPos, prefs);
    this.add.existing(newPerson);
    this.partyPeople.push(newPerson);
    newPerson.enterParty();
    this.partyState.peopleGained++;
  };

  doPartyTic = () => {
    this.partyPeople.forEach(
      (person) => person.doPartyTic(this.partyState)
    );
    this.scoreText.setText(`Score: ${this.partyState.cumulativeScore}`);
  };

  doStageTint = () => {
    let tints = [];
    tints.push(STAGE_TINT_PURPLE);
    // Tint the stage based on heat and light settings
    if ( this.partyState['light'] == 'ambience' ) {
      tints.push(STAGE_TINT_DARK);
    }
    if ( this.partyState['heat'] == 'hot' ) {
      tints.push(STAGE_TINT_RED);
    }
    else if ( this.partyState['heat'] == 'cold' ) {
      tints.push(STAGE_TINT_BLUE);
    }

    // Combine all the tints before applying them to the stage
    let resultingTint = tints.shift();
    let newTint;
    while ( newTint = tints.shift() ) {
      resultingTint = mergeColors(resultingTint, newTint);
    }
    this.stageBg.setTint(resultingTint.color);
  };

  drawClock = (x, y, timer) => {
    // Clock code was originally provided as a Phaser example at http://labs.phaser.io/edit.html?src=src\time\clock.js
    //  Progress is between 0 and 1, where 0 = the hand pointing up and then rotating clockwise a full 360
    //  The frame
    this.graphics.clear();
    this.graphics.lineStyle(6, 0xffffff, 1);
    this.graphics.strokeCircle(x, y, this.clockSize);

    let angle, dest, p1, p2, size;

    //  The "hour" hand (overall progress) (only if repeat > 0)
    if (timer.repeat > 0)
    {
      size = this.clockSize * 0.6;
      // Give the player x hours, starting at 7pm
      let durationAngle = config.partyDuration * 30;
      angle = (durationAngle * timer.getOverallProgress()) + 120;
      dest = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle), size);

      this.graphics.lineStyle(2, 0xff0000, 1);
      this.graphics.beginPath();
      this.graphics.moveTo(x, y);

      p1 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);
      this.graphics.lineTo(p1.x, p1.y);
      this.graphics.lineTo(dest.x, dest.y);
      this.graphics.moveTo(x, y);

      p2 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);
      this.graphics.lineTo(p2.x, p2.y);
      this.graphics.lineTo(dest.x, dest.y);
      this.graphics.strokePath();
      this.graphics.closePath();
    }

    //  The current iteration hand
    size = this.clockSize * 0.95;
    angle = (360 * timer.getProgress()) - 90;
    dest = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle), size);
    
    this.graphics.lineStyle(2, 0xffff00, 1);
    this.graphics.beginPath();
    this.graphics.moveTo(x, y);

    p1 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);
    this.graphics.lineTo(p1.x, p1.y);
    this.graphics.lineTo(dest.x, dest.y);
    this.graphics.moveTo(x, y);

    p2 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);
    this.graphics.lineTo(p2.x, p2.y);
    this.graphics.lineTo(dest.x, dest.y);
    this.graphics.strokePath();
    this.graphics.closePath();
  }

  update = () => {
    super.update();
    this.partyPeople.forEach((person) => person.update());
    this.drawClock(100, 200, this.clockTimer);
  }
}
