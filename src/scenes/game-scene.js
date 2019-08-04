import { Scene, Math } from 'phaser';

class GameScene extends Scene {
    constructor() {
        super('Game');
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
        this.load.spritesheet('squareLost', './assets/player/square-lost.png', {
            frameWidth: 112,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 9
        });
        this.load.spritesheet('lost', './assets/player/lost.png', {
            frameWidth: 414,
            frameHeight: 66,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet('win', './assets/player/win.png', {
            frameWidth: 414,
            frameHeight: 66,
            startFrame: 0,
            endFrame: 6
        });
        this.load.image('enemy', './assets/enemy/square.png');
    }

    create() {
        this.player = this.addPlayer();
        this.enemies = this.addEnemies();
        this.operation = this.addOperation('+', 5, '#303030');

        this.addCollision();
    }

    update() {
        this.addControl();
    }

    addPlayer() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const playerSize = gameWidth / 5;

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

        return container;
    }

    playerWin() {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const squareWin = this.add.sprite(-((140 * playerSize / 80) - this.player.body.width) / 2, -((140 * playerSize / 80) - this.player.body.height) / 2,'squareWin');
        squareWin.setOrigin(0, 0);
        squareWin.setScale(playerSize / 80, playerSize / 80);

        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('squareWin', { start: 0, end: 11 }),
            frameRate: 40,
            repeat: 0
        });
        squareWin.anims.play('win');
        this.player.add(squareWin);

        this.player.body.setVelocityY(0);
        this.destroyEnemies();

        this.enemies = this.addEnemies();
        this.addCollision();

        this.addOperation('/', 2, '#38c7c6');
    }

    playerLost() {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const squareLost = this.add.sprite((-((112 * playerSize / 80) - this.player.body.width) / 2) * 2, -15,'squareLost');
        squareLost.setOrigin(0, 0);
        squareLost.setScale(1.2, 1.2);
        const lost = this.add.sprite(0, this.player.y - playerSize,'lost');
        lost.setOrigin(0, 0);
        lost.setScale(gameWidth / 414, playerSize / 66);

        this.player.list[0] && this.player.list[0].destroy();
        this.player.list[1] && this.player.list[1].destroy();

        this.anims.create({
            key: 'squareLost',
            frames: this.anims.generateFrameNumbers('squareLost', { start: 0, end: 9 }),
            frameRate: 35,
            repeat: -1
        });
        squareLost.anims.play('squareLost');
        this.anims.create({
            key: 'lost',
            frames: this.anims.generateFrameNumbers('lost', { start: 0, end: 6 }),
            frameRate: 35,
            repeat: 0
        });
        lost.anims.play('lost');
        this.player.add(squareLost);

        this.player.body.setVelocityY(0);
        this.destroyEnemies();
    }

    addEnemies() {
        const gameWidth = window.innerWidth;
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
            container.body.setVelocityY(250);

            enemies.push(container);
        }

        return enemies;
    }

    destroyEnemies() {
        for (const enemy of this.enemies) {
            enemy.body.setVelocityY(0);
            enemy.destroy();
        }

        this.enemies = [];
    }

    addOperation(symbol, number, backgroundColor) {
        if (this.operation) {
            this.operation.destroy();
        }

        this.cameras.main.setBackgroundColor(backgroundColor);

        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const operation = this.add.text(0, 0, `${ symbol }${ number }`, { fontSize: 236 });
        operation.x = (gameWidth - operation.width) / 2;
        operation.y = (gameHeight - operation.height) / 2;
        operation.setDepth(-1);

        return operation;
    }

    addCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.physics.add.collider(this.player, this.enemies[i], (player, enemy) => {
                if (enemy.body.touching.down) {
                    if (false) {
                        this.playerWin();
                    } else {
                        this.playerLost();
                    }
                }
            });
        }
    }

    addControl() {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const pointer = this.input.activePointer;

        if (pointer.isDown) {
            this.player.x = Math.Clamp(pointer.x, 0, gameWidth - playerSize);
        }
    }
}

export default GameScene;