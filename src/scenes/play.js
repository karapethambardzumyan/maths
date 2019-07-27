import { Scene } from 'phaser';

import {ENEMY, GAME, PLAYER} from '../config';

class Play extends Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet('square', './assets/player/square.png', {
            frameWidth: 80,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 7
        });
        this.load.spritesheet('squareWin', './assets/player/square-win.png', {
            frameWidth: 140,
            frameHeight: 140,
            startFrame: 0,
            endFrame: 11
        });
        this.load.image('enemy', './assets/enemy/square.png');
    }

    create() {
        this.player = this.addPlayer();
        this.enemies = this.addEnemies();

        this.addCollision();
    }

    update() {
        this.moveEnemies();
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

    playerWin() {
        const squareWin = this.add.sprite(-(140 - PLAYER.width) / 2, -(140 - PLAYER.height) / 2,'squareWin');
        squareWin.setOrigin(0, 0);

        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('squareWin', { start: 0, end: 11 }),
            frameRate: 40,
            repeat: 0
        });
        squareWin.anims.play('win');
        this.player.add(squareWin);
    }

    addEnemies() {
        const enemies = [];

        for (let i = 0; i < 4; i++) {
            const square = this.physics.scene.add.tileSprite(0, 0, 80, 80, 'enemy');
            square.setOrigin(0, 0);
            square.displayWidth = ENEMY.width;
            square.displayHeight = ENEMY.height;

            const number = this.add.text(0, 0, '2', { fontSize: 36 });
            number.x = (ENEMY.width - number.width) / 2;
            number.y = (ENEMY.height - number.height) / 2;

            const container = this.add.container(ENEMY.width * i, 0, [square, number]);
            this.physics.world.enable(container);
            container.body.width = ENEMY.width;
            container.body.height = ENEMY.height;

            enemies.push(container);
        }

        return enemies;
    }

    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].y += 10;
        }
    }

    addCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.physics.add.collider(this.player, this.enemies[i], (player, enemy) => {
                enemy.destroy();
                this.playerWin();
            });
        }
    }
}

export default Play;