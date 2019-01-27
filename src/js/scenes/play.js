import config from '../config/config';

import Person from '../actors/Person';
import Control from '../ui/control';

import dummyStageImg from 'assets/dummy-stage.png';
import danceSprites from 'assets/dance-ss-small-2.png';
import hostSprite from 'assets/host.png';

import popMp3 from 'assets/audio/pop.mp3';
import popOpus from 'assets/audio/pop.opus';
import rockMp3 from 'assets/audio/rock.mp3';
import rockOpus from 'assets/audio/rock.opus';
import synthwaveMp3 from 'assets/audio/synthwave.mp3';
import synthwaveOpus from 'assets/audio/synthwave.opus';

import ambientMp3 from 'assets/audio/ambient.mp3';
import besttime1Mp3 from 'assets/audio/besttime1.mp3';
import besttime2Mp3 from 'assets/audio/besttime2.mp3';
import besttime3Mp3 from 'assets/audio/besttime3.mp3';
import besttime4Mp3 from 'assets/audio/besttime4.mp3';
import besttime5Mp3 from 'assets/audio/besttime5.mp3';
import besttime6Mp3 from 'assets/audio/besttime6.mp3';
import doorMp3 from 'assets/audio/door.mp3';
import happy1Mp3 from 'assets/audio/happy1.mp3';
import happy2Mp3 from 'assets/audio/happy2.mp3';
import leave1Mp3 from 'assets/audio/leave1.mp3';
import leave2Mp3 from 'assets/audio/leave2.mp3';
import leave3Mp3 from 'assets/audio/leave3.mp3';
import leave4Mp3 from 'assets/audio/leave4.mp3';
import leave5Mp3 from 'assets/audio/leave5.mp3';
import leave6Mp3 from 'assets/audio/leave6.mp3';
import unhappy1Mp3 from 'assets/audio/unhappy1.mp3';
import unhappy2Mp3 from 'assets/audio/unhappy2.mp3';
import walkinMp3 from 'assets/audio/walkin.mp3';
import welcome1Mp3 from 'assets/audio/welcome1.mp3';
import welcome2Mp3 from 'assets/audio/welcome2.mp3';

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
    this.load.image('host', hostSprite);

    this.load.audio('pop', [popMp3, popOpus]);
    this.load.audio('rock', [rockMp3, rockOpus]);
    this.load.audio('synthwave', [synthwaveMp3, synthwaveOpus]);

    this.load.spritesheet('dance-ss-small', danceSprites, {
      frameWidth: 104,
      frameHeight: 160
    });

    this.load.audio('ambient', ambientMp3);
    this.load.audio('besttime1', besttime1Mp3);
    this.load.audio('besttime2', besttime2Mp3);
    this.load.audio('besttime3', besttime3Mp3);
    this.load.audio('besttime4', besttime4Mp3);
    this.load.audio('besttime5', besttime5Mp3);
    this.load.audio('besttime6', besttime6Mp3);
    this.load.audio('door', doorMp3);
    this.load.audio('happy1', happy1Mp3);
    this.load.audio('happy2', happy2Mp3);
    this.load.audio('leave1', leave1Mp3);
    this.load.audio('leave2', leave2Mp3);
    this.load.audio('leave3', leave3Mp3);
    this.load.audio('leave4', leave4Mp3);
    this.load.audio('leave5', leave5Mp3);
    this.load.audio('leave6', leave6Mp3);
    this.load.audio('unhappy1', unhappy1Mp3);
    this.load.audio('unhappy2', unhappy2Mp3);
    this.load.audio('walkin', walkinMp3);
    this.load.audio('welcome1', welcome1Mp3);
    this.load.audio('welcome2', welcome2Mp3);

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
    this.setupParty();
    this.setupClock();
    this.setupControls();
    this.startTheParty();
  }

  onStateChange( prefName, newState ) {
    this.doStageTint();
    if(prefName == 'music'){
        this.changeMusic(newState);
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
    let location = this.getSpawnLocation();
    this.hostSprite = this.add.sprite(location.x, location.y, 'host');
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
     * Trigger changes in the audio playing with changeMusic().
     */
    const soundCfgMusic = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    const soundCfgAmbient = {
      mute: false,
      volume: 0.85,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    const soundCfgSfx = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.gAudio = {};

    // TODO: Welcome
    this.gAudio.welcome = [
      this.sound.add('welcome1', soundCfgSfx),
      this.sound.add('welcome2', soundCfgSfx)
    ]

    // Music
    this.gAudio.music = new Map();
    this.gAudio.music.set('pop', this.sound.add('pop', soundCfgMusic));
    this.gAudio.music.set('rock', this.sound.add('rock', soundCfgMusic));
    this.gAudio.music.set('synthwave', this.sound.add('synthwave', soundCfgMusic));

    // Ambient (looped)
    // TODO: change volume based on number
    this.gAudio.ambient = this.sound.add('ambient', soundCfgAmbient);

    // Walkin/Door SFX
    // TODO: Leave sfx when player leaves
    this.gAudio.walkin = this.sound.add('walkin', soundCfgSfx);
    this.gAudio.door = this.sound.add('door', soundCfgSfx);

    // TODO: Happy/unhappy SFX
    this.gAudio.happy = [
      this.sound.add('happy1', soundCfgSfx),
      this.sound.add('happy2', soundCfgSfx)
    ]
    this.gAudio.unhappy = [
      this.sound.add('unhappy1', soundCfgSfx),
      this.sound.add('unhappy2', soundCfgSfx)
    ]

    // TODO: Besttime/leave SFX
    this.gAudio.besttime = [
      this.sound.add('besttime1', soundCfgSfx),
      this.sound.add('besttime2', soundCfgSfx),
      this.sound.add('besttime3', soundCfgSfx),
      this.sound.add('besttime4', soundCfgSfx),
      this.sound.add('besttime5', soundCfgSfx),
      this.sound.add('besttime6', soundCfgSfx)
    ]
    this.gAudio.leave = [
      this.sound.add('leave1', soundCfgSfx),
      this.sound.add('leave2', soundCfgSfx),
      this.sound.add('leave3', soundCfgSfx),
      this.sound.add('leave4', soundCfgSfx),
      this.sound.add('leave5', soundCfgSfx),
      this.sound.add('leave6', soundCfgSfx)
    ]
  };

  changeMusic = (newTrack) => {
    /* Stops all tracks and plays one defined by newTrack. */
    for (var track of this.gAudio.music.values()) {
      track.stop();
    }

    this.gAudio.music.get(newTrack).play();
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
    this.changeMusic('pop');
    this.gAudio.ambient.play();
  };

  stopTheParty = () => {
    if ( this.clockTimer.getOverallProgress() >= 1 ) {
      // Party's over, punks!
      console.log('Party\'s Over!', this.partyState);
      this.partyTickTimer.destroy();
      this.personSpawnTimer.destroy();

      // Stop all BGM audio
      this.gAudio.ambient.stop();
      for (var track of this.gAudio.music.values()) {
        track.stop();
      }
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
    console.log("Adding person with prefs:", prefs);
    const newPerson = new Person(this, startingPos, prefs);
    this.add.existing(newPerson);
    this.partyPeople.push(newPerson);
    this.gAudio.walkin.play();
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
