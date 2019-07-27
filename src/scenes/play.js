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
        this.load.spritesheet('squareWin', './assets/player/square-win.png', {
            frameWidth: 140,
            frameHeight: 140,
            startFrame: 0,
            endFrame: 11
        });
    }

    create() {
        this.player = this.addPlayer();

        this.playerWin(() => {
            console.log(this.player);
        });
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

    playerWin(callback) {
        this.player.body.width = 140;
        this.player.body.height = 140;
        this.player.list[0].x += (140 - PLAYER.width) / 2;
        this.player.list[0].y = (140 - PLAYER.height) / 2;
        this.player.list[1].x += (140 - PLAYER.width) / 2;
        this.player.list[1].y += (140 - PLAYER.height) / 2;
        this.player.x -= (140 - PLAYER.width) / 2;
        this.player.y -= (140 - PLAYER.height) / 2;

        const squareWin = this.add.sprite(0, 0, 'squareWin');
        squareWin.setOrigin(0, 0);

        squareWin.on('animationcomplete', () => {
            this.player.destroy();
            this.player = this.addPlayer();

            return callback();
        }, squareWin);

        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('squareWin', { start: 0, end: 11 }),
            frameRate: 50,
            repeat: 0
        });
        squareWin.anims.play('win');
        this.player.add(squareWin);
    }
}

export default Play;