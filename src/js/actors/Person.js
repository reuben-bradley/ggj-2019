import config from '../config/config';

class Person extends Phaser.GameObjects.Sprite {
  constructor(scene, standingPos, partyPrefs) {
    super(scene, standingPos.x, standingPos.y, 'person');
    this.standingPos = standingPos;
    this.partyPrefs = partyPrefs;
    this.happiness = 50;
  }

  update() {
    // animate etc
  }

  doPartyTic(partyState) {
    // compare partyState to prefs, adjust happiness
    // act accordingly
  }

  joinParty() {
    // spawn at party entrance and move to standingPos
  }

  leaveParty() {
    // leave via party entrance
  }
}

export default Person;
