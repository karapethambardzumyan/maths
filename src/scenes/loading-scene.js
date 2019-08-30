import { Scene } from 'phaser';

class LoadingScene extends Scene {
    constructor() {
        super('Loading');
    }

    preload() {
        this.load.image('background', './assets/menu/background.png');
        this.load.image('logo', './assets/menu/logo.png');
        this.load.image('borderMenu', './assets/menu/border.png');
        this.load.image('topbar', './assets/menu/topbar.png');
        this.load.image('leaderboardButton', './assets/menu/leaderboard.png');
        this.load.image('noAdsButton', './assets/menu/no-ads.png');
        this.load.image('soundOnButton', './assets/menu/sound-on.png');
        this.load.image('soundOffButton', './assets/menu/sound-off.png');
        this.load.image('musicOnButton', './assets/menu/music-on.png');
        this.load.image('playButton', './assets/menu/play.png');
        this.load.image('soonButton', './assets/menu/soon.png');

        this.load.image('borderLevels', './assets/levels/border.png');
        this.load.image('closeLevels', './assets/levels/close.png');
        this.load.image('level1', './assets/levels/level-1.png');
        this.load.image('level2', './assets/levels/level-2.png');
        this.load.image('level3', './assets/levels/level-3.png');
        this.load.image('level4', './assets/levels/level-4.png');
        this.load.image('level5', './assets/levels/level-5.png');
        this.load.image('level6', './assets/levels/level-6.png');
        this.load.image('levelInfinity', './assets/levels/level-infinity.png');

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
            // this.scene.start('Menu');
            this.scene.start('Levels');
        });
    }
}

export default LoadingScene;
