import { Scene } from 'phaser';

import { GAME, PLAYER } from '../config';

class Play extends Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet('square', './assets/player/square.png', {
            frameWidth: PLAYER.width,
            frameHeight: PLAYER.height,
            startFrame: 0,
            endFrame: 7
        });
    }

    create() {
        this.player = this.addPlayer();
    }

    addPlayer() {
        this.anims.create({
            key: 'changeColors',
            frames: this.anims.generateFrameNumbers('square', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        const square = this.add.sprite(0, 0, 'square');
        square.setOrigin(0, 0);
        square.anims.play('changeColors');

        const number = this.add.text(0, 0, '1', { fontSize: 36 });
        number.x = (PLAYER.width - number.width) / 2;
        number.y = (PLAYER.height - number.height) / 2;

        const container = this.physics.scene.add.container((GAME.width - PLAYER.width) / 2, GAME.height - PLAYER.height * 2, [square, number]);
        this.physics.world.enable(container);
        container.body.width = PLAYER.width;
        container.body.height = PLAYER.height;
        container.body.setCollideWorldBounds(true);

        return container;
    }
}

export default Play;