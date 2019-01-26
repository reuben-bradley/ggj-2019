import config from '../config/config';

import Person from '../actors/Person';
import Control from '../ui/control';

import dummyStageImg from 'assets/dummy-stage.png';
import personImg from 'assets/person.png';

const TINT_BLACK = Phaser.Display.Color.HexStringToColor('0x666666');
const TINT_RED = Phaser.Display.Color.HexStringToColor('0xffaaaa');

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play'});
  }

  preload() {
    this.load.image('dummy-stage', dummyStageImg);
    this.load.image('person', personImg);
  }

  create() {
    this.setupStage();
    this.setupSpawnLocations();
    this.setupParty();
    this.setupControls();
    this.startTheParty();
  }

  onStateChange( prefName, newState ) {
    // Tint the stage based on heat and light settings
    if ( prefName == 'light' || prefName == 'heat' ) {
      if ( this.partyState['light'] == 1 && this.partyState['heat'] == 0 ) {
        // Lights on, heat off = no tinting
        this.stageBg.clearTint();
      }
      else if ( this.partyState['light'] == 0 && this.partyState['heat'] == 1 ) {
        // Lights off, heat on = both tints
        let tint = new Phaser.Display.Color(TINT_RED.red, TINT_BLACK.green, TINT_BLACK.blue);
        this.stageBg.setTint(tint.color);
      }
      else if ( this.partyState['light'] == 0 ) {
        // Lights off, heat off = dark tint
        this.stageBg.setTint(TINT_BLACK.color);
      }
      else {
        // Lights on, heat on = red tint
        this.stageBg.setTint(TINT_RED.color);
      }
    }
  }

  setupStage = () => {
    this.stageBg = this.add.image(
      this.sys.canvas.width * 0.5,
      this.sys.canvas.height * 0.5,
      'dummy-stage'
    );
    this.stageBg.setScale(0.45);
    this.stageBg.setTint(TINT_BLACK.color);
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
      volume: 0
    };
    this.partyPrefNames = Object.keys(this.partyState);
    this.partyPeople = [];
  };

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
          this.onStateChange(prefName, this.partyState[prefName]);
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
