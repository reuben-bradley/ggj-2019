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
    console.log('Play create');

    const newPerson = new Person(this, { x:200, y:400 }, {});
    this.add.existing(newPerson);
  }
}
