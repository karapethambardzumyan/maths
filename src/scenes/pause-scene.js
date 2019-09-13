import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';

class PauseScene extends Scene {
    constructor() {
        super('Pause');
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.pause = this.addPause();
        this.pauseButton = this.addPauseButton();
        this.goGameButton = this.addGoGameButton();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.pause,
            this.goGameButton
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
        const border = this.add.image(0, 0, 'borderPause');
        border.setScale(this.ratio);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = 0;

        return border;
    }

    addPause() {
        const pause = this.add.image(0, 0, 'pause');
        pause.setScale(this.ratio);
        pause.setOrigin(0, 0);
        pause.x = (this.game.config.width - pause.displayWidth) / 2;
        pause.y = 0;

        return pause;
    }

    addPauseButton() {
        const pauseButton = this.add.image(0, 0, 'pauseButton');
        pauseButton.setScale(this.ratio);
        pauseButton.setOrigin(0, 0);
        pauseButton.x = this.ratio * 12;
        pauseButton.y = this.ratio * 12;

        pauseButton.setInteractive();

        pauseButton.on('pointerdown', () => {
            pauseButton.setFrame(1);
        });

        pauseButton.on('pointerup', () => {
            pauseButton.setFrame(0);

            this.scene.stop('Pause');
            this.scene.resume('Game');
        });

        pauseButton.on('pointerout', () => {
            pauseButton.setFrame(0);
        });

        return pauseButton;
    }

    addGoGameButton() {
        const goGameButton = this.add.image(0, 0, 'goGameButton');
        goGameButton.setScale(this.ratio);
        goGameButton.setOrigin(0, 0);
        goGameButton.x = (this.game.config.width - goGameButton.displayWidth) / 2;
        goGameButton.y = this.border.y + (this.ratio * 480);

        goGameButton.setInteractive();

        goGameButton.on('pointerup', () => {
            this.scene.stop('Pause');
            this.scene.resume('Game');
        });

        return goGameButton;
    }
}

export default PauseScene;
