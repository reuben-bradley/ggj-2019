import config from '../config/config';

class Control extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, onClickFn) {
    super(scene, x, y, texture, frame);

    this.setInteractive({ useHandCursor: true })
      .on('pointerup', () => {
        const res = onClickFn();
        this.setFrame(res);
      });
  }
}

export default Control;
