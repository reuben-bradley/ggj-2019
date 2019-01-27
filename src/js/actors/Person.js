import config from '../config/config';

class Person extends Phaser.GameObjects.Sprite {
  constructor(scene, standingPos, partyPrefs) {
    super(
      scene,
      config.personEnterExitPoint.x,
      config.personEnterExitPoint.y,
      null
    );

    this.anims.play('dance', true);

    const tintColor = Math.random() * 0xffffff;
    this.tintTopLeft = tintColor;
    this.tintTopRight = tintColor;
    this.setScale(1 - (Math.random() * 0.1));

    this.standingPos = standingPos;
    this.isDancing = false;
    this.partyPrefs = partyPrefs;
    this.prevHappiness = this.happiness = 50;

    // Add meter
    this.setOrigin(0.5, 1)
    this.meterText = new Phaser.GameObjects.Text(
      scene, standingPos.x, standingPos.y - this.height, '', config.textStyles.meter
    );
    this.meterText.setOrigin(0.5, 1);
    this.meterText.setShadow(2, 2, 'black');
    this.meterText.visible = false;
    this.displayHappiness();
    scene.add.existing(this.meterText);
  }

  update = () => {
    // TODO: depth sort
    super.update();
    if (!this.isAlive) return false;
    this.depth = this.y;
  }

  doPartyTic = (partyState) => {
    if (!this.isDancing) return false;

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
    partyState.cumulativeScore += this.happiness;
    this.displayHappiness();
    this.updateDanceSpeed();
    this.prevHappiness = this.happiness;

    if (this.happiness === 0 && this.prevHappiness === 0) {
      partyState.peopleLost++;
      this.leaveParty();
    }
  }

  updateDanceSpeed = () => {
    this.anims.msPerFrame = config.maxPersonDanceFrameTime - ((
      config.maxPersonDanceFrameTime - config.minPersonDanceFrameTime
    ) * this.happiness / 100);

    if (Math.random() < 0.2) this.flipX = !this.flipX;
  }

  displayHappiness = () => {
    let adjTxt = ' ';
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

  enterParty = () => {
    // spawn at party entrance and move to standingPos
    this.findMySpot = this.scene.tweens.timeline({
      targets: this,
      totalDuration: 3000,
      tweens: [
        { x: this.standingPos.x },
        { y: this.standingPos.y }
      ],
      onComplete: () => {
        this.startPartying();
      }
    });
  }

  startPartying() {
    // TODO: play dance
    this.meterText.setVisible(true);
    this.isDancing = true;
  }

  leaveParty() {
    // leave via party entrance
    this.isDancing = false;
    this.meterText.setVisible(false);

    this.letsGo = this.scene.tweens.timeline({
      targets: this,
      totalDuration: 2000,
      tweens: [
        { y: config.personEnterExitPoint.y },
        { x: config.personEnterExitPoint.x }
      ],
      onComplete: () => {
        this.destroy();
      }
    });
  }
}

export default Person;
