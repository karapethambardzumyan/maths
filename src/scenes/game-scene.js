import { Math, Scene } from 'phaser';
import { MAX_WIDTH, SPEED_RATIO } from '../constants';
import LEVELS from '../constants/levels';
import { getRandomInt } from '../helpers/numbers';
import { playAudio } from '../helpers/audio-manager';

class GameScene extends Scene {
    constructor() {
        super('Game');
    }

    init(data) {
        this.levelId = data.levelId;
        this.level = LEVELS[this.levelId];
        this.playerNumber = data.playerNumber;
        this.leaderboard = data.leaderboard;
    }

    create() {
        switch (this.levelId) {
            case 0:
                playAudio('level12Audio');
                break;
            case 1:
                playAudio('level12Audio');
                break;
            case 2:
                playAudio('level34Audio');
                break;
            case 3:
                playAudio('level34Audio');
                break;
            case 4:
                playAudio('level5Audio');
                break;
            case 5:
                playAudio('level6Audio');
                break;
        }

        this.operationOptions = {
            symbol: null,
            number: null,
            answerNumber: 0
        };
        this.life = 3;
        this.newLevel = false;
        this.ratio = this.game.config.width / MAX_WIDTH;

        if (this.levelId === LEVELS.length) {
            console.log('infinity level');
        }

        this.player = this.addPlayer(this.playerNumber);
        this.operation = this.addOperation();
        this.enemies = this.addEnemies();
        this.lives = this.addLives();
        this.pauseButton = this.addPauseButton();

        this.addCollision();
    }

    update() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const enemySize = gameWidth / 5;

        this.addControl();

        if (window.Math.max(...this.enemies.map(enemy => enemy.y)) - enemySize > gameHeight && !this.newLevel) {
            this.destroyEnemies();
            this.enemies = this.addEnemies();
            this.addCollision();
        }

        if (this.enemies.length !== 0) {
            for (const enemy of this.enemies) {
                enemy.y += (gameHeight / SPEED_RATIO) * this.level.speed;
            }
        }

        if (this.newLevelObject) {
            this.newLevelObject.y += 3;
        }

        if (this.newLevelObject && this.newLevelObject.y > this.game.config.height) {
            this.newLevelObject.destroy();
            this.newLevelObject = null;
            this.newLevel = false;

            const playerNumber = this.player.number;
            this.player.destroy();

            this.scene.start('Game', {
                playerNumber,
                levelId: this.levelId + 1,
                leaderboard: this.leaderboard
            });
        }
    }

    addPauseButton() {
        const pauseButton = this.add.image(0, 0, 'pauseButton');
        pauseButton.setScale(this.ratio);
        pauseButton.setOrigin(0, 0);
        pauseButton.x = this.ratio * 12;
        pauseButton.y = this.ratio * 12;

        pauseButton.setInteractive();

        pauseButton.on('pointerdown', () => {
            pauseButton.setFrame(1);
        });

        pauseButton.on('pointerup', () => {
            playAudio('clickAudio');

            pauseButton.setFrame(0);

            this.scene.pause('Game');
            this.scene.run('Pause', { levelId: this.levelId });
        });

        pauseButton.on('pointerout', () => {
            pauseButton.setFrame(0);
        });

        return pauseButton;
    }

    addLives() {
        const lives = [];

        const life1 = this.add.image(0, 0, 'life1');
        life1.setScale(this.ratio);
        life1.setOrigin(0, 0);
        life1.x = this.game.config.width - life1.displayWidth - (this.ratio * 15);
        life1.y = this.ratio * 10;
        life1.setVisible(false);

        const life2 = this.add.image(0, 0, 'life2');
        life2.setScale(this.ratio);
        life2.setOrigin(0, 0);
        life2.x = this.game.config.width - life2.displayWidth - (this.ratio * 15);
        life2.y = this.ratio * 10;
        life2.setVisible(false);

        const life3 = this.add.image(0, 0, 'life3');
        life3.setScale(this.ratio);
        life3.setOrigin(0, 0);
        life3.x = this.game.config.width - life3.displayWidth - (this.ratio * 15);
        life3.y = this.ratio * 10;
        life3.setVisible(true);

        lives.push(life1);
        lives.push(life2);
        lives.push(life3);

        return lives;
    }

    addPlayer(number) {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const playerSize = gameWidth / 6;

        const squareObject = this.add.rexRoundRectangle(
            0,
            0,
            playerSize,
            playerSize,
            8,
            Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color
        );
        squareObject.setOrigin(0, 0);

        const numberObject = this.add.text(0, 0, number || 2, {
            fontFamily: 'Orbitron',
            fontSize: this.fitNumberSize(number || 2)
        });
        numberObject.x = (playerSize - numberObject.width) / 2;
        numberObject.y = (playerSize - numberObject.height) / 2;

        const containerObject = this.physics.scene.add.container((gameWidth - playerSize) / 2, gameHeight - playerSize * 2, [squareObject, numberObject]);
        this.physics.world.enable(containerObject);
        containerObject.body.width = playerSize;
        containerObject.body.height = playerSize;
        containerObject.number = number || 2;

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

        playAudio('rightAnswerAudio');

        for (let enemy of this.enemies) {
            enemy.alpha = 0.6;
        }

        this.player.number = rightAnswer;
        this.player.list[1].text = rightAnswer;
        this.player.list[1].x = (playerSize - this.player.list[1].width) / 2;
        this.player.list[1].y = (playerSize - this.player.list[1].height) / 2;

        this.operation = this.addOperation(true);
    }

    playerLost() {
        this.life -= 1;

        if (this.life) {
            this.lives[this.life].setVisible(false);
            this.lives[this.life - 1].setVisible(true);

            this.destroyEnemies();
            this.operation = this.addOperation(false);

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

            playAudio('wrongAnswerAudio');

            playerLost.on('animationcomplete', () => {
                const number = this.player.number;
                const lastPlayerX = this.player.x;

                this.player.destroy();
                this.player = this.addPlayer(number);
                this.player.x = lastPlayerX;
                this.enemies = this.addEnemies();
                this.addCollision();
            }, playerLost);
        } else {
            playAudio('gameOverAudio');

            this.scene.stop('Game');
            this.scene.start('GameOver', { levelId: this.levelId, score: this.operationOptions.answerNumber, leaderboard: this.leaderboard });
            this.operationOptions.answerNumber = 0;
        }
    }

    addEnemies() {
        const gameWidth = this.game.config.width;
        const enemySize = (gameWidth / 5) * 0.9;
        const enemyMargin = (gameWidth - (enemySize * 5)) / 6;
        const enemyObjects = [];
        const rightAnswer = this.calcAnswer();
        const generatedNumbers = [rightAnswer];

        for (let i = 0; i < 5; i++) {
            const squareObject = this.add.rexRoundRectangle(
                0,
                0,
                enemySize,
                enemySize,
                8,
                Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color
            );
            squareObject.setOrigin(0, 0);

            const number = getRandomInt(rightAnswer - 10 <= 0 ? rightAnswer : rightAnswer - 10, rightAnswer + 10, generatedNumbers);
            generatedNumbers.push(number);
            const numberObject = this.add.text(0, 0, number, {
                fontFamily: 'Orbitron',
                fontSize: this.fitNumberSize(number)
            });
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

    addOperation(isWon) {
        const isPrime = n => {
            if (n === 1) {
                return false;
            } else if ( n === 2) {
                return true;
            } else {
                for (let x = 2; x < n; x++) {
                    if (n % x === 0) {
                        return false;
                    }
                }

                return true;
            }
        };

        const getDivisor = n => {
            for (let i = n - 1; i > 2; i--) {
                if (n % i === 0) {
                    return i;
                }
            }

            return false;
        };

        const setOperationOptions = () => {
            let symbols = this.level.operations;
            this.operationOptions.number = getRandomInt(1, 9);
            this.operationOptions.symbol = symbols[getRandomInt(0, symbols.length - 1)];
            this.operationOptions.symbol = '/';

            if (this.operationOptions.symbol === '/' && (this.player.number < this.operationOptions.number || isPrime(this.player.number))) {
                symbols = symbols.filter(symbol => symbol !== '/');
                this.operationOptions.symbol = symbols[getRandomInt(0, symbols.length - 1)];
            } else if (this.operationOptions.symbol === '/' && this.player.number > this.operationOptions.number && (this.player.number % this.operationOptions.number)) {
                const divisor = getDivisor(this.player.number);

                if (divisor) {
                    this.operationOptions.number = divisor;
                } else {
                    symbols = symbols.filter(symbol => symbol !== '/');
                    this.operationOptions.symbol = symbols[getRandomInt(0, symbols.length - 1)];
                }
            }

            if (this.operationOptions.symbol === '-' && this.player.number - this.operationOptions.number <= 0) {
                symbols = symbols.filter(symbol => symbol !== '-');
                this.operationOptions.symbol = symbols[getRandomInt(0, symbols.length - 1)];
            }

            if (this.operationOptions.symbol === '*' && this.player.number * this.operationOptions.number > this.level.limit) {
                symbols = symbols.filter(symbol => symbol !== '*');
                this.operationOptions.symbol = symbols[getRandomInt(0, symbols.length - 1)];
            }

            if (this.operationOptions.symbol === '+' && this.player.number + this.operationOptions.number > this.level.limit) {
                symbols = symbols.filter(symbol => symbol !== '+');
                symbols = symbols.length !== 0 ? symbols : ['-'];
                this.operationOptions.symbol = symbols[getRandomInt(0, symbols.length - 1)];
            }
        };

        if (this.operation) {
            this.operation.destroy();
        }

        this.operationOptions.answerNumber += 1;

        if (isWon === true && (this.operationOptions.answerNumber < this.level.answersCount || this.level.answersCount === Infinity)) {
            setOperationOptions();

            this.player.list[0].fillColor = Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color;
            this.cameras.main.setBackgroundColor(this.level.colors.background[this.level.answersCount !== Infinity ? this.operationOptions.answerNumber : 0]);

            const gameWidth = this.game.config.width;
            const gameHeight = this.game.config.height;
            const operation = this.add.text(0, 0, `${this.operationOptions.symbol}${this.operationOptions.number}`, {
                fontFamily: 'Orbitron',
                fontSize: `${180 * this.ratio}px`
            });
            operation.x = (gameWidth - operation.width) / 2;
            operation.y = (gameHeight - operation.height) / 2;
            operation.setDepth(-1);

            console.log('win', this.operationOptions.answerNumber, this.level.answersCount);

            return operation;
        }
        if (isWon === true && this.operationOptions.answerNumber === this.level.answersCount) {
            this.nextLevel();

            this.operationOptions = {
                symbol: null,
                number: null,
                answerNumber: 0
            };

            console.log('win level', this.operationOptions.answerNumber, this.level.answersCount);
        }
        if (isWon === false && this.life) {
            this.operationOptions.answerNumber -= 1;

            setOperationOptions();

            this.player.list[0].fillColor = Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color;
            this.cameras.main.setBackgroundColor(this.level.colors.background[this.operationOptions.answerNumber]);

            const gameWidth = this.game.config.width;
            const gameHeight = this.game.config.height;
            const operation = this.add.text(0, 0, `${ this.operationOptions.symbol }${ this.operationOptions.number }`, {
                fontFamily: 'Orbitron',
                fontSize: `${ 180 * this.ratio }px`
            });
            operation.x = (gameWidth - operation.width) / 2;
            operation.y = (gameHeight - operation.height) / 2;
            operation.setDepth(-1);

            console.log('lose one life', this.operationOptions.answerNumber, this.level.answersCount);

            return operation;
        }
        if (isWon === undefined) {
            this.operationOptions.answerNumber -= 1;

            setOperationOptions();

            this.player.list[0].fillColor = Phaser.Display.Color.HexStringToColor(this.level.colors.foreground).color;
            this.cameras.main.setBackgroundColor(this.level.colors.background[this.operationOptions.answerNumber]);

            const gameWidth = this.game.config.width;
            const gameHeight = this.game.config.height;
            const operation = this.add.text(0, 0, `${ this.operationOptions.symbol }${ this.operationOptions.number }`, {
                fontFamily: 'Orbitron',
                fontSize: `${ 180 * this.ratio }px`
            });
            operation.x = (gameWidth - operation.width) / 2;
            operation.y = (gameHeight - operation.height) / 2;
            operation.setDepth(-1);

            console.log('first time', this.operationOptions.answerNumber, this.level.answersCount);

            return operation;
        }
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

    nextLevel() {
        const answerNumber = this.operationOptions.answerNumber;

        this.newLevelObject = this.add.image(0, 0, `winLevel${ this.levelId + 2 }`);
        this.newLevelObject.setScale(this.ratio);
        this.newLevelObject.setOrigin(0, 0);
        this.newLevelObject.x = (this.game.config.width - this.newLevelObject.displayWidth) / 2;
        this.newLevelObject.y = this.ratio * 40;
        this.newLevel = true;

        let isDataFetched = false;
        this.facebook.getData(['levelId']);
        this.leaderboard.getPlayerScore();

        this.facebook.on('getdata', data => {
            this.leaderboard.on('getplayerscore', player => {
                if (!isDataFetched && this.levelId === data.levelId) {
                    isDataFetched = true;

                    if (player === null) {
                        this.leaderboard.setScore(answerNumber);
                    } else if (player.score < data.levelId * LEVELS[0].answersCount + answerNumber) {
                        this.leaderboard.setScore(data.levelId * LEVELS[0].answersCount + answerNumber);
                    }

                    this.facebook.saveData({ levelId: this.levelId + 1 });
                }
            });
        });
    }

    fitNumberSize(number) {
        const length = number.toString().length;

        switch (length) {
            case 1:
                return `${ 40 * this.ratio }px`;
            case 2:
                return `${ 35 * this.ratio }px`;
            case 3:
                return `${ 30 * this.ratio }px`;
            case 4:
                return `${ 25 * this.ratio }px`;
            case 5:
                return `${ 20 * this.ratio }px`;
        }
    }
}

export default GameScene;
