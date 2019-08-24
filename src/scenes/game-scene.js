import { Math, Scene } from 'phaser';
import { SPEED_RATIO } from '../constants';
import LEVELS from '../constants/levels';
import { getRandomInt } from '../helpers/numbers';

class GameScene extends Scene {
    constructor() {
        super('Game');

        this.level = LEVELS[0];
        this.score = 0;
        this.operationOptions = {
            symbol: null,
            number: null,
            answerNumber: 0
        };

        this.lowTimeAudio = null;
    }

    create() {
        this.player = this.addPlayer();
        this.operation = this.addOperation();
        this.enemies = this.addEnemies();

        this.addCollision();
    }

    update() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const enemySize = gameWidth / 5;

        this.addControl();

        if (window.Math.max(...this.enemies.map(enemy => enemy.y)) - enemySize > gameHeight) {
            this.destroyEnemies();
            this.enemies = this.addEnemies();
            this.addCollision();
        }

        if (this.enemies.length !== 0) {
            for (const enemy of this.enemies) {
                enemy.y += (gameHeight / SPEED_RATIO) * this.level.speed;
            }

            if (this.lowTimeAudio === null && this.enemies[0].y > gameHeight / 3) {
                this.lowTimeAudio = this.sound.add('lowTimeAudio', { loop: false });
                this.lowTimeAudio.play();
            }
        }
    }

    addPlayer() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const playerSize = gameWidth / 6;

        const squareObject = this.physics.scene.add.rectangle(
            0,
            0,
            playerSize,
            playerSize,
            Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color
        );
        squareObject.setOrigin(0, 0);

        const numberObject = this.add.text(0, 0, '2', { fontSize: 30 });
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
        const gameWidth = this.game.config.width;
        const playerSize = gameWidth / 6;
        const playerWin = this.add.sprite(-((140 * playerSize / 80) - this.player.body.width) / 2, -((140 * playerSize / 80) - this.player.body.height) / 2,'playerWin');
        playerWin.setOrigin(0, 0);
        playerWin.setScale(playerSize / 80, playerSize / 80);

        this.anims.create({
            key: 'playerWin',
            frames: this.anims.generateFrameNumbers('playerWin', { start: 0, end: 10 }),
            frameRate: 35,
            repeat: 0
        });
        playerWin.anims.play('playerWin');
        this.player.add(playerWin);
        this.lowTimeAudio.stop();
        const winAudio = this.sound.add('winAudio', { loop: false });
        winAudio.play();

        for (let enemy of this.enemies) {
            enemy.alpha = 0.6;
        }

        this.player.number = rightAnswer;
        this.player.list[1].text = rightAnswer;
        this.player.list[1].x = (playerSize - this.player.list[1].width) / 2;
        this.player.list[1].y = (playerSize - this.player.list[1].height) / 2;

        this.operation = this.addOperation();

        this.score += 1;
    }

    playerLost() {
        const gameWidth = this.game.config.width;
        const playerSize = gameWidth / 6;
        const playerLost = this.add.sprite((-((112 * playerSize / 80) - this.player.body.width) / 2) * 2, -15,'playerLost');
        playerLost.setOrigin(0, 0);
        playerLost.setScale(1.2, 1.2);

        this.player.list[0] && this.player.list[0].destroy();
        this.player.list[1] && this.player.list[1].destroy();

        this.anims.create({
            key: 'playerLost',
            frames: this.anims.generateFrameNumbers('playerLost', { start: 0, end: 9 }),
            frameRate: 35,
            repeat: 0
        });
        playerLost.anims.play('playerLost');
        this.player.add(playerLost);

        setTimeout(() => {
            this.scene.pause();
            console.log('Score:', this.score);
        }, 1000);
    }

    addEnemies() {
        const gameWidth = this.game.config.width;
        const enemySize = (gameWidth / 5) * 0.9;
        const enemyMargin = (gameWidth - (enemySize * 5)) / 6;
        const enemyObjects = [];
        const rightAnswer = this.calcAnswer();

        this.lowTimeAudio = null;

        for (let i = 0; i < 5; i++) {
            const squareObject = this.physics.scene.add.rectangle(
                0,
                0,
                enemySize,
                enemySize,
                Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color
            );
            squareObject.setOrigin(0, 0);

            const number = getRandomInt(rightAnswer - 10, rightAnswer + 10);
            const numberObject = this.add.text(0, 0, number, { fontSize: 30 });
            numberObject.x = (enemySize - numberObject.width) / 2;
            numberObject.y = (enemySize - numberObject.height) / 2;

            const containerObject = this.add.container((enemyMargin * (i + 1)) + (enemySize * i), -enemySize, [squareObject, numberObject]);
            this.physics.world.enable(containerObject);
            containerObject.body.width = enemySize;
            containerObject.body.height = enemySize;
            containerObject.number = number;

            enemyObjects.push(containerObject);
        }

        const randomEnemyObject = enemyObjects[getRandomInt(0, enemyObjects.length - 1)];

        randomEnemyObject.number = rightAnswer;
        randomEnemyObject.list[1].text = rightAnswer;
        randomEnemyObject.list[1].x = (enemySize - randomEnemyObject.list[1].width) / 2;
        randomEnemyObject.list[1].y = (enemySize - randomEnemyObject.list[1].height) / 2;

        return enemyObjects;
    }

    destroyEnemies() {
        for (const enemy of this.enemies) {
            if (enemy && enemy.body) {
                enemy.destroy();
            }
        }

        this.enemies = [];
    }

    calcAnswer() {
        let answer;

        switch (this.operationOptions.symbol) {
            case '-':
                answer = this.player.number - this.operationOptions.number;
                break;
            case '+':
                answer = this.player.number + this.operationOptions.number;
                break;
            case '/':
                answer = this.player.number / this.operationOptions.number;
                break;
            case '*':
                answer = this.player.number * this.operationOptions.number;
                break;
        }

        return answer;
    }

    addOperation() {
        this.operationOptions.symbol = this.level.operations[getRandomInt(0, this.level.operations.length - 1)];
        this.operationOptions.number = getRandomInt(1, 9);

        this.player.list[0].fillColor = Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color;
        this.cameras.main.setBackgroundColor(this.level.colors.background[this.operationOptions.answerNumber]);

        if (this.operation) {
            this.operation.destroy();
        }

        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const operation = this.add.text(0, 0, `${ this.operationOptions.symbol }${ this.operationOptions.number }`, { fontSize: 200, fill: '#ffffff' });
        operation.x = (gameWidth - operation.width) / 2;
        operation.y = (gameHeight - operation.height) / 2;
        operation.setDepth(-1);

        if (this.operationOptions.answerNumber >= this.level.answersCount) {
            this.scene.pause();
            console.log('Score:', this.score);
        } else {
            this.operationOptions.answerNumber++;
        }

        return operation;
    }

    addCollision() {
        let collided = false;

        for (let i = 0; i < this.enemies.length; i++) {
            this.physics.add.collider(this.player, this.enemies[i], (player, enemy) => {
                const playerX = this.player.x + (this.player.body.width / 2);
                const playerY = this.player.y;
                const enemyY = enemy.y + enemy.body.height;
                const rightAnswer = this.calcAnswer();
                const arrayX = [];

                if (
                    window.Math.abs(playerY - enemyY) &&
                    !collided
                ) {
                    collided = true;

                    for (let i = 0; i < this.enemies.length; i++) {
                        const enemy = this.enemies[i];
                        arrayX.push(window.Math.abs(playerX - (enemy.x + enemy.body.width / 2)));
                    }

                    const collidedEnemy = this.enemies[arrayX.indexOf(window.Math.min(...arrayX))];

                    if (
                        rightAnswer === collidedEnemy.number
                    ) {
                        collidedEnemy.destroy();
                        this.playerWin(rightAnswer);
                    } else {
                        this.playerLost();
                    }
                }
            });
        }
    }

    addControl() {
        const gameWidth = this.game.config.width;
        const playerSize = gameWidth / 6;
        const pointer = this.input.activePointer;

        if (pointer.isDown) {
            this.player.x = Math.Clamp(pointer.x - playerSize / 2, 0, gameWidth - playerSize);
        }
    }
}

export default GameScene;