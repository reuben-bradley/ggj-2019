import config from '../config/config';

class Control extends Phaser.GameObjects.Text {
  constructor(scene, x, y, label, initialValue, onClickFn) {
    super(scene, x, y, '', config.textStyles.control);

    this.label = label;
    this.updateLabel(initialValue);

    this.setInteractive({ useHandCursor: true })
      .on('pointerup', () => {
        const res = onClickFn();
        if (res === false) return;
        this.updateLabel(res);
      });
  }

  updateLabel(newValue) {
    this.setText(`${this.label}: ${newValue}`);
  }
}

export default Control;
