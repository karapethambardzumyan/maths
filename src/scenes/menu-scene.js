import { Scene } from 'phaser';

class MenuScene extends Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('logo', './assets/menu/logo.png');
        this.load.image('playButton', './assets/menu/play.png');

        this.load.spritesheet('playerWin', './assets/sprites/player-win.png', {
            frameWidth: 140,
            frameHeight: 140,
            startFrame: 0,
            endFrame: 10
        });
        this.load.spritesheet('playerLost', './assets/sprites/player-lost.png', {
            frameWidth: 112,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 9
        });

        this.load.audio('lowTimeAudio', ['./assets/audio/low-time.wav']);
        this.load.audio('winAudio', ['./assets/audio/win.wav']);
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.logo = this.addLogo();
        this.addPlayButton();
    }

    update() {

    }

    addLogo() {
        const logo = this.add.image(0, 0, 'logo');
        logo.setScale(this.game.config.width / logo.width * 0.8);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = this.game.config.height * 0.04;

        return logo;
    }

    addPlayButton() {
        const playButton = this.add.image(0, 0, 'playButton');
        playButton.setScale(this.game.config.width / playButton.width * 0.6);
        playButton.setOrigin(0, 0);
        playButton.x = (this.game.config.width - playButton.displayWidth) / 2;
        playButton.y = this.logo.y + this.logo.displayHeight + 100;

        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        return playButton;
    }
}

export default MenuScene;