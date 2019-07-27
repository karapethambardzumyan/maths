import './index.scss';
import phaser from 'phaser';

let player = null;
let enemies = null;

function addPlayer() {
    this.anims.create({
        key: 'changeColors',
        frames: this.anims.generateFrameNumbers('square', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    const square = this.add.sprite(0, 0, 'square');
    square.setOrigin(0, 0);
    // square.anims.play('changeColors');

    const number = this.add.text(0, 0, '1', { fontSize: 42 });
    number.x = (100 - number.width) / 2;
    number.y = (100 - number.height) / 2;

    const container = this.physics.scene.add.container((400 - 100) / 2, 500, [square, number]);
    this.physics.world.enable(container);
    container.body.width = 100;
    container.body.height = 100;
    container.body.setCollideWorldBounds(true);

    return container;
}

function addEnemies() {
    const enemies = [];

    for (let i = 0; i < 4; i++) {
        const square = this.add.sprite(0, 0, 'square');
        square.setOrigin(0, 0);

        const number = this.add.text(0, 0, '1', { fontSize: 42 });
        number.x = (100 - number.width) / 2;
        number.y = (100 - number.height) / 2;

        const container = this.physics.scene.add.container(100 * i, 0, [square, number]);
        this.physics.world.enable(container);
        container.body.width = 100;
        container.body.height = 100;
        container.body.setCollideWorldBounds(true);

        enemies.push(container);
    }

    return enemies;
}

const config = {
    type: phaser.AUTO,
    width: 400,
    height: 800,
    backgroundColor: '#cccccc',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: !true
        }
    },
    scene: {
        preload() {
            this.load.spritesheet('square', './assets/squares.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 7 });
            this.load.spritesheet('squareWin', './assets/squares-win.png', { frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 11 });
        },
        create() {

            let collided = false;
            player = addPlayer.call(this);
            enemies = addEnemies.call(this);

            for (let i = 0; i < enemies.length; i++) {
                this.physics.add.collider(player, enemies[i], (player, enemy) => {
                    if (!collided) {
                        player.body.width = 180;
                        player.body.height = 180;
                        player.list[0].x += (180 - 100) / 2;
                        player.list[0].y = (180 - 100) / 2;
                        player.list[1].x += (180 - 100) / 2;
                        player.list[1].y += (180 - 100) / 2;
                        player.x -= (180 - 100) / 2;
                        player.y -= (180 - 100) / 2;

                        const squareWin = this.add.sprite(0, 0, 'squareWin');
                        squareWin.setOrigin(0, 0);
                        this.anims.create({
                            key: 'win',
                            frames: this.anims.generateFrameNumbers('squareWin', { start: 0, end: 11 }),
                            frameRate: 35,
                            repeat: 0
                        });
                        squareWin.anims.play('win');
                        player.add(squareWin);

                        collided = true;
                    }
                });
            }
        },
        update() {
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].y += 15;
            }
        }
    }
};
new phaser.Game(config);