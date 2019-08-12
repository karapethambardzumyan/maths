import {Math, Scene} from 'phaser';
import LEVELS from '../constants/levels';
import {getRandomInt} from '../helpers/numbers';

class GameScene extends Scene {
    constructor() {
        super('Game');

        this.level = LEVELS[0];
        this.operation = {
            symbol: null,
            number: null,
            answerNumber: 0
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
    }

    create() {
        this.playerObject = this.addPlayer();
        this.operationObject = this.addOperation();
        this.enemyObjects = this.addEnemies();

        this.addCollision();
    }

    update() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const enemySize = gameWidth / 5;

        this.addControl();

        if (window.Math.max(...this.enemyObjects.map(enemy => enemy.y)) - enemySize > gameHeight) {
            this.destroyEnemies();
            this.enemyObjects = this.addEnemies();
            this.addCollision();
        }
    }

    addPlayer() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const playerSize = gameWidth / 5;

        const squareObject = this.physics.scene.add.rectangle(
            0,
            0,
            playerSize,
            playerSize,
            Phaser.Display.Color.HexStringToColor(this.level.colors.foreground[this.operation.answerNumber]).color
        );
        squareObject.setOrigin(0, 0);

        const numberObject = this.add.text(0, 0, '2', { fontSize: 36 });
        numberObject.x = (playerSize - numberObject.width) / 2;
        numberObject.y = (playerSize - numberObject.height) / 2;

        const containerObject = this.physics.scene.add.container((gameWidth - playerSize) / 2, gameHeight - playerSize * 2, [squareObject, numberObject]);
        this.physics.world.enable(containerObject);
        containerObject.body.width = playerSize;
        containerObject.body.height = playerSize;
        containerObject.number = 2;

        return containerObject;
    }

    playerWin(rightAnswer) {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const squareWin = this.add.sprite(-((140 * playerSize / 80) - this.playerObject.body.width) / 2, -((140 * playerSize / 80) - this.playerObject.body.height) / 2,'squareWin');
        squareWin.setOrigin(0, 0);
        squareWin.setScale(playerSize / 80, playerSize / 80);

        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('squareWin', { start: 0, end: 10 }),
            frameRate: 35,
            repeat: 0
        });
        squareWin.anims.play('win');
        this.playerObject.add(squareWin);

        for (let enemy of this.enemyObjects) {
            enemy.alpha = 0.6;
        }

        this.playerObject.body.setVelocityY(0);
        this.playerObject.number = rightAnswer;
        this.playerObject.list[1].text = rightAnswer;
        this.playerObject.list[1].x = (playerSize - this.playerObject.list[1].width) / 2;
        this.playerObject.list[1].y = (playerSize - this.playerObject.list[1].height) / 2;

        this.operationObject = this.addOperation();
    }

    playerLost() {
        const gameWidth = window.innerWidth;
        const playerSize = gameWidth / 5;
        const squareLost = this.add.sprite((-((112 * playerSize / 80) - this.playerObject.body.width) / 2) * 2, -15,'squareLost');
        squareLost.setOrigin(0, 0);
        squareLost.setScale(1.2, 1.2);

        this.playerObject.list[0] && this.playerObject.list[0].destroy();
        this.playerObject.list[1] && this.playerObject.list[1].destroy();

        this.anims.create({
            key: 'squareLost',
            frames: this.anims.generateFrameNumbers('squareLost', { start: 0, end: 9 }),
            frameRate: 35,
            repeat: 0
        });
        squareLost.anims.play('squareLost');
        this.playerObject.add(squareLost);
        this.playerObject.body.setVelocityY(0);

        this.scene.pause();
    }

    addEnemies() {
        const gameWidth = window.innerWidth;
        const enemySize = (gameWidth / 4) * 0.9;
        const enemyMargin = ((gameWidth) - (enemySize * 4)) / 5;
        const enemyObjects = [];

        for (let i = 0; i < 4; i++) {
            const squareObject = this.physics.scene.add.rectangle(
                0,
                0,
                enemySize,
                enemySize,
                Phaser.Display.Color.HexStringToColor(this.level.colors.foreground[this.operation.answerNumber]).color
            );
            squareObject.setOrigin(0, 0);

            const number = getRandomInt(0, this.level.limit);
            const numberObject = this.add.text(0, 0, number, { fontSize: 36 });
            numberObject.x = (enemySize - numberObject.width) / 2;
            numberObject.y = (enemySize - numberObject.height) / 2;

            const containerObject = this.add.container((enemyMargin * (i +1)) + (enemySize * i), -enemySize, [squareObject, numberObject]);
            this.physics.world.enable(containerObject);
            containerObject.body.width = enemySize;
            containerObject.body.height = enemySize;
            containerObject.body.setVelocityY(250 * this.level.speed);
            containerObject.number = number;

            enemyObjects.push(containerObject);
        }

        const randomEnemyObject = enemyObjects[getRandomInt(0, enemyObjects.length - 1)];
        const rightAnswer = this.calcAnswer();

        randomEnemyObject.number = rightAnswer;
        randomEnemyObject.list[1].text = rightAnswer;
        randomEnemyObject.list[1].x = (enemySize - randomEnemyObject.list[1].width) / 2;
        randomEnemyObject.list[1].y = (enemySize - randomEnemyObject.list[1].height) / 2;

        return enemyObjects;
    }

    destroyEnemies() {
        for (const enemy of this.enemyObjects) {
            if (enemy && enemy.body) {
                enemy.body.setVelocityY(0);
                enemy.destroy();
            }
        }

        this.enemyObjects = [];
    }

    calcAnswer() {
        let answer;

        switch (this.operation.symbol) {
            case '-':
                answer = this.playerObject.number - this.operation.number;
                break;
            case '+':
                answer = this.playerObject.number + this.operation.number;
                break;
            case '/':
                answer = this.playerObject.number / this.operation.number;
                break;
            case '*':
                answer = this.playerObject.number * this.operation.number;
                break;
        }

        return answer;
    }

    addOperation() {
        this.operation.symbol = this.level.operations[getRandomInt(0, this.level.operations.length - 1)];
        this.operation.number = getRandomInt(0, 10);

        this.playerObject.list[0].fillColor = Phaser.Display.Color.HexStringToColor(this.level.colors.foreground[this.operation.answerNumber]).color;
        this.cameras.main.setBackgroundColor(this.level.colors.background[this.operation.answerNumber]);

        if (this.operationObject) {
            this.operationObject.destroy();
        }

        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;
        const operationObject = this.add.text(0, 0, `${ this.operation.symbol }${ this.operation.number }`, { fontSize: 200, fill: '#ffffff' });
        operationObject.x = (gameWidth - operationObject.width) / 2;
        operationObject.y = (gameHeight - operationObject.height) / 2;
        operationObject.setDepth(-1);

        if (this.answer >= this.level.answersCount) {
            this.scene.pause();
        } else {
            this.answer++;
        }

        return operationObject;
    }

    addCollision() {
        let collided = false;

        for (let i = 0; i < this.enemyObjects.length; i++) {
            this.physics.add.collider(this.playerObject, this.enemyObjects[i], (player, enemy) => {
                if (enemy.body.touching.down) {
                    if (!collided) {
                        const rightAnswer = this.calcAnswer();

                        if (rightAnswer === enemy.number) {
                            enemy.destroy();
                            this.playerWin(rightAnswer);
                        } else {
                            enemy.destroy();
                            this.playerLost();
                        }

                        collided = true;
                    } else {
                        enemy.destroy();
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
            this.playerObject.x = Math.Clamp(pointer.x - playerSize / 2, 0, gameWidth - playerSize);
        }
    }
}

export default GameScene;