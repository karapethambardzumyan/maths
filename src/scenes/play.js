import { Scene, Math } from 'phaser';

import { ENEMY, GAME, PLAYER } from '../config';

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
        this.addControl();
    }

    addPlayer() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const playerSize = gameWidth / 4;

        this.anims.create({
            key: 'changeColors',
            frames: this.anims.generateFrameNumbers('square', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        const square = this.add.sprite(0, 0, 'square');
        square.setOrigin(0, 0);
        square.setScale(playerSize / 80, playerSize / 80);
        square.anims.play('changeColors');

        const number = this.add.text(0, 0, '1', { fontSize: 36 });
        number.x = (playerSize - number.width) / 2;
        number.y = (playerSize - number.height) / 2;

        const container = this.physics.scene.add.container((gameWidth - playerSize) / 2, gameHeight - playerSize * 2, [square, number]);
        this.physics.world.enable(container);
        container.body.width = playerSize;
        container.body.height = playerSize;
        container.body.setCollideWorldBounds(true);

        return container;
    }

    playerWin() {
        const squareWin = this.add.sprite(-(140 - playerSize) / 2, -(140 - playerSize) / 2,'squareWin');
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
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const enemySize = gameWidth / 4;
        const enemies = [];

        for (let i = 0; i < 4; i++) {
            const square = this.physics.scene.add.tileSprite(0, 0, 80, 80, 'enemy');
            square.setOrigin(0, 0);
            square.displayWidth = enemySize;
            square.displayHeight = enemySize;

            const number = this.add.text(0, 0, '2', { fontSize: 36 });
            number.x = (enemySize - number.width) / 2;
            number.y = (enemySize - number.height) / 2;

            const container = this.add.container(enemySize * i, 0, [square, number]);
            this.physics.world.enable(container);
            container.body.width = enemySize;
            container.body.height = enemySize;

            enemies.push(container);
        }

        return enemies;
    }

    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].y += 5;
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

    addControl() {
        const pointer = this.input.activePointer;

        if (pointer.isDown) {
            this.player.x = Math.Clamp(pointer.x, 0, GAME.width - 80);
        }
    }
}

export default Play;