import config from '../config/config';

import logo from 'assets/title-logo.png';

export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'title' });
    }

    preload() {
        this.load.image('logo', logo);
        // Load fonts for the game
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        console.log('PHASER', Phaser);
        console.log('Title create');
        WebFont.load({
            google: {
                families: [config.textStyles.title.fontFamily, config.textStyles.default.fontFamily, config.textStyles.score.fontFamily]
            },
            active: () => {
                this.add.image(config.canvas.width / 2, config.canvas.height / 2, 'logo');
                const prompt = this.add.text(400, 400, 'Press any key to continue', config.textStyles.default);
                prompt.setOrigin(0.5);
            }
        });

        this.input.manager.enabled = true;
        this.input.once('pointerdown', () => {
            this.scene.start('play');
        }, this);
    }
};
