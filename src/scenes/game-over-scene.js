import { Scene } from 'phaser';
import LEVELS from '../constants/levels';

class GameOverScene extends Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.levelId = data.levelId;
        this.level = LEVELS[this.levelId];
    }

    create() {
        this.ratio = this.game.config.width / 414;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.gameOver = this.addGameOver();
        this.bestScore = this.addBestScore();
        this.bestScoreBoard = this.addBestScoreBoard();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.gameOver,
            this.bestScore,
            // this.bestScoreBoard
        ]);
        // this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
        this.menu.y = 0;
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
        gameOver.setScale(this.ratio);
        gameOver.setOrigin(0, 0);
        gameOver.x = (this.game.config.width - gameOver.displayWidth) / 2;
        gameOver.y = this.ratio * 90;

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
        bestScoreBoard.x = this.game.config.width - (this.bestScore.x + this.bestScore.displayWidth) - (this.ratio * 3);
        bestScoreBoard.y = this.gameOver.y + this.gameOver.displayHeight + (this.ratio * 55);

        return bestScoreBoard;
    }
}

export default GameOverScene;
