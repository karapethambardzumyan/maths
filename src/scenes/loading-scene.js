import { Scene } from 'phaser';

class LoadingScene extends Scene {
    constructor() {
        super('Loading');
    }

    preload() {
        this.load.image('logo', './assets/menu/logo.png');
        this.load.image('playButton', './assets/menu/play.png');
        this.load.image('soonButton', './assets/menu/soon.png');
        this.load.image('border', './assets/menu/border.png');
        this.load.image('leaderboard', './assets/menu/leaderboard.png');
        this.load.image('musicOn', './assets/menu/music-on.png');
        this.load.image('soundOn', './assets/menu/sound-on.png');
        this.load.image('soundOff', './assets/menu/sound-off.png');

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

        this.load.on('fileprogress', file => {
            this.loading && this.loading.destroy();

            this.loading = this.add.text(0, 0, file.src, { fontSize: 16 });
            this.loading.x = (this.game.config.width - this.loading.width) / 2;
            this.loading.y = (this.game.config.height - this.loading.height) / 2;
        });

        this.load.on('complete', () => {
            this.scene.start('Menu');
        });
    }
}

export default LoadingScene;