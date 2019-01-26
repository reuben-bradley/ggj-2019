import config from '../config/config';
import personImg from 'assets/person.png';
import Person from '../actors/Person';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play'});
  }

  preload() {
    console.log('Play preload');
    this.load.image('person', personImg);
  }

  create() {
    console.log('Play create', this);

    this.partyState = {
      heat: 0,
      light: 0,
      volume: 0
    };
    this.partyPrefNames = Object.keys(this.partyState);

    this.partyPeople = [];
    this.addNewRandomPerson();

    this.partyTickTimer = this.time.addEvent({
      delay: config.partyTickTime,
      callback: this.doPartyTic,
      loop: true
    });

    this.personSpawnTimer = this.time.addEvent({
      delay: config.newPersonSpawnTime,
      callback: this.addNewRandomPerson,
      loop: true
    })
  }

  addNewRandomPerson = () => {
    if (this.partyPeople.length === config.maxPersons) return false;

    const specificPref = Phaser.Utils.Array.GetRandom(this.partyPrefNames);
    const prefValue = Phaser.Math.RND.integerInRange(0, 1);

    this.addPartyPerson({
        x: Phaser.Math.RND.integerInRange(100, 700),
        y: Phaser.Math.RND.integerInRange(300, 500)
      },
      {
        [specificPref]: prefValue
      }
    );
  }

  addPartyPerson = (startingPos, prefs) => {
    const newPerson = new Person(this, startingPos, prefs);
    this.add.existing(newPerson);
    this.partyPeople.push(newPerson);
  }

  doPartyTic = () => {
    this.partyPeople.forEach(
      (person) => person.doPartyTic(this.partyState)
    );
  }
}
