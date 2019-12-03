import { Scene } from 'phaser';
import { addAudio } from '../helpers/audio-manager';

class LoadingScene extends Scene {
    constructor() {
        super('Loading');
    }

    preload() {
        this.facebook.once('startgame', () => {
            this.facebook.getLeaderboard('test-board');
            this.facebook.on('getleaderboard', leaderboard => {
                this.facebook.on('savedata', data => {
                    this.facebook.getData(['levelId']);
                });

                this.facebook.on('getdata', data => {
                    if ('levelId' in data) {
                        this.levelId = data.levelId;
                        this.scene.start('Menu', { levelId: this.levelId, leaderboard });
                    } else {
                        this.facebook.saveData({ levelId: 0 });
                    }
                });

                this.facebook.getData(['levelId']);
            }, this);
        }, this);
        this.facebook.showLoadProgress(this);

        this.load.rexWebFont({
            custom: {
                families: ['Orbitron'],
                urls: ['./assets/fonts/index.css']
            }
        });

        this.load.image('background', './assets/menu/background.png');
        this.load.image('logo', './assets/menu/logo.png');
        this.load.image('borderMenu', './assets/menu/border.png');
        this.load.image('topbar', './assets/menu/topbar.png');
        this.load.image('noAdsButton', './assets/menu/no-ads.png');
        this.load.spritesheet('soundsButton', './assets/menu/sounds.png', {
            frameWidth: 49,
            frameHeight: 50
        });
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

        this.load.image('borderPause', './assets/pause/border.png');
        this.load.image('pause', './assets/pause/pause.png');
        this.load.spritesheet('pauseButton', './assets/pause/pause-button.png', {
            frameWidth: 24,
            frameHeight: 28
        });
        this.load.spritesheet('pauseSoundsButton', './assets/pause/pause-sound-button.png', {
            frameWidth: 144,
            frameHeight: 66
        });
        this.load.image('goMenuButton', './assets/pause/go-menu-button.png');
        this.load.image('goGameButton', './assets/pause/go-game-button.png');

        this.load.spritesheet('leaderboardButton', './assets/menu/leaderboard.png', {
            frameWidth: 39,
            frameHeight: 34
        });
        this.load.image('borderTopLeaderboard', './assets/leaderboard/border-top.png');
        this.load.image('borderBottomLeaderboard', './assets/leaderboard/border-bottom.png');
        this.load.image('borderBottomPlayerLeaderboard', './assets/leaderboard/border-bottom-player.png');
        this.load.image('logoLeaderboard', './assets/leaderboard/logo.png');
        this.load.image('titleLeaderboard', './assets/leaderboard/title.png');
        this.load.image('goMenuLeaderboardButton', './assets/leaderboard/go-menu.png');

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
        this.load.image('life1', './assets/game/life-1.png');
        this.load.image('life2', './assets/game/life-2.png');
        this.load.image('life3', './assets/game/life-3.png');
        this.load.image('winLevel1', './assets/game/win-level-1.png');
        this.load.image('winLevel2', './assets/game/win-level-2.png');
        this.load.image('winLevel3', './assets/game/win-level-3.png');
        this.load.image('winLevel4', './assets/game/win-level-4.png');
        this.load.image('winLevel5', './assets/game/win-level-5.png');
        this.load.image('winLevel6', './assets/game/win-level-6.png');

        this.load.audio('clickAudio', ['./assets/audio/click.wav']);
        this.load.audio('rightAnswerAudio', ['./assets/audio/right-answer.wav']);
        this.load.audio('wrongAnswerAudio', ['./assets/audio/wrong-answer.wav']);
        this.load.audio('gameOverAudio', ['./assets/audio/game-over.wav']);
        this.load.audio('menuAudio', ['./assets/audio/menu.mp3']);
        this.load.audio('level12Audio', ['./assets/audio/level-1-2.mp3']);
        this.load.audio('level34Audio', ['./assets/audio/level-3-4.mp3']);
        this.load.audio('level5Audio', ['./assets/audio/level-5.mp3']);
        this.load.audio('level6Audio', ['./assets/audio/level-6.mp3']);
    }

    create() {
        addAudio('clickAudio', this, false);
        addAudio('rightAnswerAudio', this, false);
        addAudio('wrongAnswerAudio', this, false);
        addAudio('gameOverAudio', this, false);
        addAudio('menuAudio', this, true, 'music');
        addAudio('level12Audio', this, true, 'music');
        addAudio('level34Audio', this, true, 'music');
        addAudio('level5Audio', this, true, 'music');
        addAudio('level6Audio', this, true, 'music');
    }
}

export default LoadingScene;
