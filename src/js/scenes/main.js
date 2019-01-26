import config from '../config/config';
import * as THREE from 'three';

export default class Main extends Phaser.Scene {
    constructor() {
        super({ key: 'main' });

        // Three.js setup
        this.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
        this.renderer.setSize(config.canvas.width, config.canvas.height);
        this.renderer.setClearColor(0x0000ff, 1);
        document.body.appendChild(this.renderer.domElement);

        // Create the scene and camera
        this.threeJSScene = new THREE.Scene();
        this.threeJSCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
        this.threeJSCamera.position.z = 1.5;

        this.frameCount = 0;
    }

    preload() {
        // Load necessary tiles and sprites
    }

    create() {
        const test = this.add.text(400, 200, 'This is the Main Screen', config.textStyles.title);
        test.setOrigin(0.5);

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.threeJSScene.add(this.mesh);

        //this.threeJSSprite = this.add.sprite(0, 0, null);
        this.renderThreeJS();
        //this.textures.addBase64('test', this.renderer.domElement.toDataURL('image/png'));
        this.threeJSSprite = this.add.image(0, 0, null);
    }

    update() {
        this.mesh.rotateY(0.01);
        this.renderThreeJS(this.threeJSSprite);
        //this.renderThreeJS();
    }

    renderThreeJS( target ) {
        if ( this.renderer ) {
            this.renderer.render(this.threeJSScene, this.threeJSCamera);

            if ( target ) {
                target.setTexture();
                //if ( this.textures.exists('test') ) {
                //    this.textures.remove('test');
                //}
                this.textures.addBase64('test', this.renderer.domElement.toDataURL('image/png'));
                target.setTexture('test');
            }
        }
    }
};
