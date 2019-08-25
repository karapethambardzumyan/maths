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
        this.gameOver = this.addGameOver();
        this.addTryAgainButton();

        this.cameras.main.setBackgroundColor(this.level.colors.background[0]);
    }

    addGameOver() {
        const gameOver = this.add.text(0, 0, 'Game Over', { fontSize: 40 });
        gameOver.x = (this.game.config.width - gameOver.width) / 2;
        gameOver.y = 30;

        return gameOver;
    }

    addTryAgainButton() {
        const tryAgainButton = this.add.text(0, 0, 'Try Again', { fontSize: 60 });
        tryAgainButton.x = (this.game.config.width - tryAgainButton.displayWidth) / 2;
        tryAgainButton.y = this.gameOver.y + this.gameOver.height + 100;

        tryAgainButton.setInteractive();

        tryAgainButton.on('pointerdown', () => {
            this.scene.start('Game', { levelId: this.levelId });
        });

        return tryAgainButton;
    }
}

export default GameOverScene;