import config from '../config/config';

class Person extends Phaser.GameObjects.Sprite {
  constructor(scene, standingPos, partyPrefs) {
    super(scene, standingPos.x, standingPos.y, 'person');

    this.standingPos = standingPos;
    this.depth = standingPos.y;
    this.partyPrefs = partyPrefs;
    this.prevHappiness = this.happiness = 50;

    // Add meter
    this.setOrigin(0.5, 1)
    this.meterText = new Phaser.GameObjects.Text(
      scene, standingPos.x, standingPos.y - this.height, '', config.textStyles.meter
    );
    this.meterText.setOrigin(0.5, 1);
    this.meterText.depth = standingPos.y + 100;
    this.meterText.setShadow(2, 2, 'black');
    this.displayHappiness();
    scene.add.existing(this.meterText);
  }

  update() {
    // animate etc
  }

  doPartyTic = (partyState) => {
    // compare partyState to prefs, adjust happiness
    let happinessDiff = 0;

    for (const pref in this.partyPrefs) {
      const prefVal = this.partyPrefs[pref];
      const partyVal = partyState[pref];
      // Reduce happiness for each unmet pref
      if (partyVal !== prefVal) {
        happinessDiff += config.happinessDecline;
      }
    }
    // Only grow happiness if all prefs are met
    this.happiness += (happinessDiff < 0) ? happinessDiff : config.happinessGrowth;
    this.happiness = Phaser.Math.Clamp(this.happiness, 0, 100);
    this.displayHappiness();
    this.prevHappiness = this.happiness;
  }

  displayHappiness = () => {
    let adjTxt = '';
    let color = 'white';

    if (this.prevHappiness < this.happiness) {
      adjTxt = '+';
      color = 'lightgreen';
    }

    if (this.prevHappiness > this.happiness) {
      adjTxt = '-';
      color = 'pink';
    }

    this.meterText.style.color = color;
    this.meterText.setText(`${this.happiness} ${adjTxt}`);
  }

  enterParty() {
    // spawn at party entrance and move to standingPos
  }

  leaveParty() {
    // leave via party entrance
  }
}

export default Person;
