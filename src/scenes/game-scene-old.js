import { Scene, Math } from 'phaser';
import { getRandomInt } from '../helpers/numbers';
import LEVELS from '../constants/levels/index';

class GameScene extends Scene {
    constructor() {
        super('Game');

        this.level = LEVELS[0];
        this.answer = 0;
        this.operation = {
            symbol: null,
            number: null,
            backgroundColor: null
        };
    }

    preload() {
        this.load.spritesheet('squareWin', './assets/player/square-win.png', {
            frameWidth: 140,
            frameHeight: 140,
            startFrame: 0,
            endFrame: 10
        });
        this.load.spritesheet('squareLost', './assets/player/square-lost.png', {
            frameWidth: 112,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 9
        });
        this.load.image('enemy', './assets/enemy/square.png');
    }

    create() {
        this.player = this.addPlayer();
        this.enemies = this.addEnemies();
        this.operationObject = this.addOperation();

        this.addCollision();
    }

    update() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const enemySize = gameWidth / 5;

        this.addControl();

        if (window.Math.max(...this.enemies.map(enemy => enemy.y)) - enemySize > gameHeight) {
            this.destroyEnemies();
            this.enemies = this.addEnemies();
            this.addCollision();
        }
    }

    calcAnswer() {
        let answer;

        switch (this.operation.symbol) {
            case '-':
                answer = this.player.number - this.operation.number;
                break;
            case '+':
                answer = this.player.number + this.operation.number;
                break;
            case '/':
                answer = this.player.number / this.operation.number;
                break;
            case '*':
                answer = this.player.number * this.operation.number;
                break;
        }

        return answer;
    }

    addPlayer() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const playerSize = gameWidth / 5;

        const square = this.physics.scene.add.rectangle(0, 0, playerSize, playerSize, Phaser.Display.Color.HexStringToColor(this.level.colors.foreground[this.answer]).color);
        square.setOrigin(0, 0);

        const number = this.add.text(0, 0, '2', { fontSize: 36 });
        number.x = (playerSize - number.width) / 2;
        number.y = (playerSize - number.height) / 2;

        const container = this.physics.scene.add.container((gameWidth - playerSize) / 2, gameHeight - playerSize * 2, [square, number]);
        this.physics.world.enable(container);
        container.body.width = playerSize;
        container.body.height = playerSize;
        container.number = 2;

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
            frames: this.anims.generateFrameNumbers('squareWin', { start: 0, end: 10 }),
            frameRate: 35,
            repeat: 0
        });
        squareWin.anims.play('win');
        this.player.add(squareWin);

        for (let enemy of this.enemies) {
            enemy.alpha = 0.6;
        }

        this.player.body.setVelocityY(0);

        const answer = this.calcAnswer();

        this.player.number = answer;
        this.player.list[1].text = answer;
        this.player.list[1].x = (playerSize - this.player.list[1].width) / 2;
        this.player.list[1].y = (playerSize - this.player.list[1].height) / 2;

        this.operation.symbol = this.level.operations[getRandomInt(0, this.level.operations.length - 1)];
        this.operation.number = getRandomInt(0, 10);

        this.operationObject = this.addOperation();
    }

    playerLost() {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const squareLost = this.add.sprite((-((112 * playerSize / 80) - this.player.body.width) / 2) * 2, -15,'squareLost');
        squareLost.setOrigin(0, 0);
        squareLost.setScale(1.2, 1.2);

        this.player.list[0] && this.player.list[0].destroy();
        this.player.list[1] && this.player.list[1].destroy();

        this.anims.create({
            key: 'squareLost',
            frames: this.anims.generateFrameNumbers('squareLost', { start: 0, end: 9 }),
            frameRate: 35,
            repeat: 0
        });
        squareLost.anims.play('squareLost');
        this.player.add(squareLost);
        this.player.body.setVelocityY(0);
    }

    addEnemies() {
        const gameWidth = window.innerWidth;
        const enemySize = (gameWidth / 4) * 0.9;
        const enemyMargin = ((gameWidth) - (enemySize * 4)) / 5;
        const enemies = [];

        for (let i = 0; i < 4; i++) {
            const square = this.physics.scene.add.rectangle(0, 0, enemySize, enemySize, Phaser.Display.Color.HexStringToColor(this.level.colors.foreground[this.answer]).color);
            square.setOrigin(0, 0);

            const numberValue = getRandomInt(0, this.level.limit);
            const number = this.add.text(0, 0, numberValue, { fontSize: 36 });
            number.x = (enemySize - number.width) / 2;
            number.y = (enemySize - number.height) / 2;

            const container = this.add.container((enemyMargin * (i +1)) + (enemySize * i), -enemySize, [square, number]);
            this.physics.world.enable(container);
            container.body.width = enemySize;
            container.body.height = enemySize;
            container.body.setVelocityY(250 * this.level.speed);
            container.number = numberValue;

            enemies.push(container);
        }

        this.operation.symbol = this.level.operations[getRandomInt(0, this.level.operations.length - 1)];
        this.operation.number = getRandomInt(0, 10);

        const answer = this.calcAnswer();
        const randomEnemy = enemies[getRandomInt(0, 3)];
        randomEnemy.number = answer;
        randomEnemy.list[1].text = answer;
        randomEnemy.list[1].x = (enemySize - randomEnemy.list[1].width) / 2;
        randomEnemy.list[1].y = (enemySize - randomEnemy.list[1].height) / 2;

        return enemies;
    }

    destroyEnemies() {
        for (const enemy of this.enemies) {
            if (enemy && enemy.body) {
                enemy.body.setVelocityY(0);
                enemy.destroy();
            }
        }

        this.enemies = [];
    }

    addOperation() {
        this.player.list[0].fillColor = Phaser.Display.Color.HexStringToColor(this.level.colors.foreground[this.answer]).color;
        this.cameras.main.setBackgroundColor(this.level.colors.background[this.answer]);

        if (this.operationObject) {
            this.operationObject.destroy();
        }

        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const operation = this.add.text(0, 0, `${ this.operation.symbol }${ this.operation.number }`, { fontSize: 200, fill: '#ffffff' });
        operation.x = (gameWidth - operation.width) / 2;
        operation.y = (gameHeight - operation.height) / 2;
        operation.setDepth(-1);

        if (this.answer >= this.level.answersCount) {
            this.scene.pause();
        } else {
            this.answer++;
        }

        return operation;
    }

    addCollision() {
        let collided = false;

        for (let i = 0; i < this.enemies.length; i++) {
            this.physics.add.collider(this.player, this.enemies[i], (player, enemy) => {
                if (enemy.body.touching.down && !collided) {
                    console.log(player.number, enemy.number);

                    if (true) {
                        enemy.destroy();
                        this.playerWin();
                    } else {
                        enemy.destroy();
                        this.playerLost();
                    }

                    collided = true;
                } else {
                    enemy.destroy();
                    this.playerLost();
                }
            });
        }
    }

    addControl() {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const pointer = this.input.activePointer;

        if (pointer.isDown) {
            this.player.x = Math.Clamp(pointer.x - playerSize / 2, 0, gameWidth - playerSize);
        }
    }
}

export default GameScene;