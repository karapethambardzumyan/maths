import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';
import {getAudioType, getAudio, setAudioType} from '../helpers/audio-manager';

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
        this.goMenuButton = this.addGoMenuButton();
        this.soundsButton = this.addSoundsButton();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.pause,
            this.goGameButton,
            this.goMenuButton,
            this.soundsButton
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
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

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
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.scene.stop('Pause');
            this.scene.resume('Game');
        });

        return goGameButton;
    }

    addGoMenuButton() {
        const goMenuButton = this.add.image(0, 0, 'goMenuButton');
        goMenuButton.setScale(this.ratio);
        goMenuButton.setOrigin(0, 0);
        goMenuButton.x = (this.border.x + this.border.displayWidth) - (goMenuButton.displayWidth + (this.ratio * 24));
        goMenuButton.y = this.border.y + (this.ratio * 370);

        goMenuButton.setInteractive();

        goMenuButton.on('pointerup', () => {
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.scene.stop('Pause');
            this.scene.stop('Game');
            this.scene.start('Menu');
        });

        return goMenuButton;
    }

    addSoundsButton() {
        const soundsButton = this.add.image(0, 0, 'pauseSoundsButton');
        soundsButton.setScale(this.ratio);
        soundsButton.setOrigin(0, 0);
        soundsButton.x = this.border.x + (this.ratio * 24);
        soundsButton.y = this.border.y + (this.ratio * 370);

        soundsButton.setInteractive();

        switch (getAudioType()) {
            case 0:
                soundsButton.setFrame(2);
                break;
            case 1:
                soundsButton.setFrame(1);
                break;
            case 2:
                soundsButton.setFrame(0);
                break;
        }

        soundsButton.on('pointerup', () => {
            switch (getAudioType()) {
                case 0:
                    setAudioType(1);
                    soundsButton.setFrame(1);
                    break;
                case 1:
                    setAudioType(2);
                    soundsButton.setFrame(0);
                    break;
                case 2:
                    setAudioType(0);
                    soundsButton.setFrame(2);
                    break;
            }

            getAudio('clickAudio').play();
        });

        return soundsButton;
    }
}

export default PauseScene;
