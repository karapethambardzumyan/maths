import { Scene } from 'phaser';

class LoadingScene extends Scene {
    constructor() {
        super('Loading');
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

        let progressBar;
        let progressBox;

        this.load.on('progress', value => {
            progressBar = this.add.graphics();
            progressBox = this.add.graphics();

            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();

            this.scene.start('Menu');
        });
    }
}

export default LoadingScene;