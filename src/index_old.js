import './index.scss';
import phaser from 'phaser';

let player = null;
let enemies = new Array(6);
let pointer = null;
let speed = 4;
let score = 0;

const helpers = {
    getRandomNumber(min, max) {
        return Number((Math.random() * (max - min) + min).toFixed());
    },
    getRandomNumberExcept(exceptionNumber, min, max) {
        const randomNumber = Number((Math.random() * (max - min) + min).toFixed());

        if (exceptionNumber === randomNumber) {
            return helpers.getRandomNumberExcept(exceptionNumber, min, max);
        } else {
            return randomNumber;
        }
    }
};

function addPlayer() {
    const config = {
        key: 'changeColors',
        frames: this.anims.generateFrameNumbers('square', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: Infinity
    };

    this.anims.create(config);

    const square = this.physics.add.sprite(70 * 6 / 2, (70 * 6 * 2) - 70, 'square');
    square.anims.play('changeColors');
    // square.displayWidth = 70;
    // square.displayHeight = 70;

    // const square = this.physics.scene.add.tileSprite(70 / 2, 70 / 2, 118, 118, 'squares');
    // square.tilePositionX = 24;
    // square.tilePositionY = 13;
    // square.displayWidth = 70;
    // square.displayHeight = 70;
    //
    const number = this.add.text(70 / 2, 70 / 2, '2', { fontSize: 42 });
    number.setOrigin(0.5, 0.5);

    const container = this.physics.scene.add.container(((70 * 6) - 70) / 2, (70 * 6 * 2) - (70 * 2), [square, number]);
    this.physics.world.enable(container);
    container.number = 2;
    container.body.setCollideWorldBounds(true);

    return container;
};

function addEnemies(config) {
    const randomNumber = helpers.getRandomNumber(0, 4);
    const enemies = [];

    for (let i = 0; i < 5; i++) {
        const randomNumber = helpers.getRandomNumberExcept(config.winNumber, 0, 9);

        const square = this.physics.scene.add.tileSprite(70 / 2, 70 / 2, 118, 118, 'squares');
        square.tilePositionX = 26 + (118 + 12) * 3;
        square.tilePositionY = 13 + (30 + 118) * 3;
        square.displayWidth = 70;
        square.displayHeight = 70;

        const number = this.add.text(70 / 2, 70 / 2, randomNumber, { fontSize: 42 });
        number.setOrigin(0.5, 0.5);

        const container = this.add.container((i * 17.5) + (i * 70), -70, [square, number]);
        this.physics.world.enable(container);
        container.number = randomNumber;

        enemies.push(container);
    }

    enemies[randomNumber].number = config.winNumber;
    enemies[randomNumber].list[1].text = config.winNumber;

    return enemies;
};

function destoryEnemies(enemies) {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i] && enemies[i].destroy();

        delete enemies[i];
    }

    return true;
};

function updateBackground() {
    const text = '+2';
    const background = this.add.text((70 * 6) / 2, (70 * 6 * 2) / 2, text, { fill: '#a074d5', fontSize: 240 });
    background.setOrigin(0.5, 0.5);

    this.cameras.main.setBackgroundColor('#8532c5');

    return background;
};

function addCollision() {
    for (let i = 0; i < enemies.length; i++) {
        this.physics.add.collider(player, enemies[i], (player, enemy) => {
            if (player.number + 2 === enemy.number) {
                enemy.destroy();
                delete enemies[i];

                speed += 0.2;
                score += 1;
            } else {
                this.scene.stop();

                if (confirm(`Record: ${ score }, Make a new record`)) {
                    score = 0;

                    this.scene.start();
                }
            }
        });
    }
};

const config = {
    type: phaser.AUTO,
    width: 70 * 6,
    height: 70 * 6 * 2,
    backgroundColor: '#cccccc',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload() {
            // this.load.image('squares', './assets/squares.png');
            // this.load.spritesheet('boom', './assets/squares.png', { frameWidth: 90, frameHeight: 90, endFrame: 8 });
            this.load.spritesheet('square', './assets/squares.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 7 });
        },
        create() {
            const canvasEl = document.querySelector('canvas');
            canvasEl.innerWidth = canvasEl.offsetHeight / 2;

            updateBackground.call(this);

            player = addPlayer.call(this);
            enemies = addEnemies.call(this, { winNumber: 4 });

            addCollision.call(this);
        },
        update() {
            pointer = this.input.activePointer;

            if (pointer.isDown) {
                // player.x = Phaser.Math.Clamp(pointer.x, 0, (70 * 6) - 70);
            }

            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i] && enemies[i].y - 70 > 70 * 6 * 2) {
                    destoryEnemies.call(this, enemies);
                    enemies = addEnemies.call(this, { winNumber: 4 });
                    addCollision.call(this);
                }

                if (enemies[i]) {
                    // enemies[i].y += speed
                }
            }
        }
    }
};
new phaser.Game(config);