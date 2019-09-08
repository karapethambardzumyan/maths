import { Scene } from 'phaser';

class LoadingScene extends Scene {
    constructor() {
        super('Loading');
    }

    preload() {
        this.facebook.once('startgame', () => this.scene.start('Menu'), this);
        this.facebook.showLoadProgress(this);

        this.load.image('background', './assets/menu/background.png');
        this.load.image('logo', './assets/menu/logo.png');
        this.load.image('borderMenu', './assets/menu/border.png');
        this.load.image('topbar', './assets/menu/topbar.png');
        this.load.spritesheet('leaderboardButton', './assets/menu/leaderboard.png', {
            frameWidth: 39,
            frameHeight: 34
        });
        this.load.image('noAdsButton', './assets/menu/no-ads.png');
        this.load.spritesheet('soundsButton', './assets/menu/sounds.png', {
            frameWidth: 49,
            frameHeight: 50
        });
        this.load.image('soundOffButton', './assets/menu/sound-off.png');
        this.load.image('musicOnButton', './assets/menu/music-on.png');
        this.load.spritesheet('playButton', './assets/menu/play.png', {
            frameWidth: 260,
            frameHeight: 85
        });
        this.load.image('soonButton', './assets/menu/soon.png');

        this.load.image('borderGameOver', './assets/game-over/border.png');
        this.load.image('gameOver', './assets/game-over/game-over.png');
        this.load.image('bestScore', './assets/game-over/best-score.png');
        this.load.image('bestScoreBoard', './assets/game-over/best-score-board.png');
        this.load.image('shareButton', './assets/game-over/share.png');
        this.load.image('tryAgainButton', './assets/game-over/try-again.png');

        this.load.image('borderLevels', './assets/levels/border.png');
        this.load.image('closeLevels', './assets/levels/close.png');
        this.load.image('level1', './assets/levels/level-1.png');
        this.load.image('level2', './assets/levels/level-2.png');
        this.load.image('level3', './assets/levels/level-3.png');
        this.load.image('level4', './assets/levels/level-4.png');
        this.load.image('level5', './assets/levels/level-5.png');
        this.load.image('level6', './assets/levels/level-6.png');
        this.load.image('levelInfinity', './assets/levels/level-infinity.png');
        this.load.image('levelLocked', './assets/levels/lock.png');

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
}

export default LoadingScene;
