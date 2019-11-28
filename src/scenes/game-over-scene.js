import { Scene } from 'phaser';
import LEVELS from '../constants/levels';
import { MAX_WIDTH } from '../constants';
import { getAudio, getAudioType } from '../helpers/audio-manager';

class GameOverScene extends Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.levelId = data.levelId;
        this.score = data.score;
        this.level = LEVELS[this.levelId];
        this.leaderboard = data.leaderboard;
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.gameOver = this.addGameOver();
        this.bestScore = this.addBestScore();
        this.bestScoreBoard = this.addBestScoreBoard();
        this.bestScoreValue = this.addBestScoreValue();
        this.shareButton = this.addShareButton();
        this.tryAgainButton = this.addTryAgainButton();

        this.menu = this.add.container(0, 0, [
            this.gameOver,
            this.bestScore,
            this.bestScoreBoard,
            this.bestScoreValue,
            this.shareButton,
            this.tryAgainButton
        ]);
        this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
    }

    addBackground() {
        const background = this.add.image(0, 0, 'background');
        background.setScale(this.game.config.width / background.width, this.game.config.height / background.height);
        background.setOrigin(0, 0);

        return background;
    }

    addBorder() {
        const border = this.add.image(0, 0, 'borderGameOver');
        border.setScale(this.game.config.width / border.width, this.game.config.height / border.height);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = 0;

        return border;
    }

    addGameOver() {
        const gameOver = this.add.image(0, 0, 'gameOver');
        gameOver.setScale(this.game.config.width / gameOver.width);
        gameOver.setOrigin(0, 0);
        gameOver.x = (this.game.config.width - gameOver.displayWidth) / 2;
        gameOver.y = 0;

        return gameOver;
    }

    addBestScore() {
        const bestScore = this.add.image(0, 0, 'bestScore');
        bestScore.setScale(this.ratio);
        bestScore.setOrigin(0, 0);
        bestScore.x = this.ratio * 20;
        bestScore.y = this.gameOver.y + this.gameOver.displayHeight + (this.ratio * 55);

        return bestScore;
    }

    addBestScoreBoard() {
        const bestScoreBoard = this.add.image(0, 0, 'bestScoreBoard');
        bestScoreBoard.setScale(this.ratio);
        bestScoreBoard.setOrigin(0, 0);
        bestScoreBoard.x = this.game.config.width - (this.bestScore.x + this.bestScore.displayWidth) - (this.ratio * 5);
        bestScoreBoard.y = this.gameOver.y + this.gameOver.displayHeight + (this.ratio * 55);

        return bestScoreBoard;
    }

    addBestScoreValue() {
        const bestScoreValue = this.add.text(0, 0, this.score, { fontFamily: 'Orbitron', fontSize: '55px' });
        bestScoreValue.setOrigin(0, 0);
        bestScoreValue.x = this.bestScoreBoard.x + (this.bestScoreBoard.displayWidth - bestScoreValue.displayWidth) / 2;
        bestScoreValue.y = this.bestScoreBoard.y + (this.bestScoreBoard.displayHeight - bestScoreValue.displayHeight) / 2;

        return bestScoreValue;
    }

    addShareButton() {
        const shareButton = this.add.image(0, 0, 'shareButton');
        shareButton.setScale(this.ratio);
        shareButton.setOrigin(0, 0);
        shareButton.x = (this.game.config.width - shareButton.displayWidth) / 2;
        shareButton.y = this.bestScore.y + this.bestScore.displayHeight + (this.ratio * 65);

        shareButton.setInteractive();

        shareButton.on('pointerup', () => {
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.game.renderer.snapshot(img => {
                FBInstant.shareAsync({
                    intent: 'SHARE',
                    image: img.src,
                    text: 'Game Over'
                });
            });
        });

        return shareButton;
    }

    addTryAgainButton() {
        const tryAgainButton = this.add.image(0, 0, 'tryAgainButton');
        tryAgainButton.setScale(this.ratio);
        tryAgainButton.setOrigin(0, 0);
        tryAgainButton.x = (this.game.config.width - tryAgainButton.displayWidth) / 2;
        tryAgainButton.y = this.shareButton.y + this.shareButton.displayHeight + (this.ratio * 65);

        tryAgainButton.setInteractive();

        tryAgainButton.on('pointerup', () => {
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.scene.start('Game', { levelId: this.levelId, leaderboard: this.leaderboard });
        });

        return tryAgainButton;
    }
}

export default GameOverScene;
