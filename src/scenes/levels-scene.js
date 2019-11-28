import { Scene } from 'phaser';
import LEVELS from '../constants/levels';
import { MAX_WIDTH } from '../constants';
import { getAudioType, getAudio} from '../helpers/audio-manager';

class LevelsScene extends Scene {
    constructor() {
        super('Levels');
    }

    init(data) {
        console.log(data);
        this.levelId = data.levelId;
        this.leaderboard = data.leaderboard;
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.closeButton = this.addCloseButton();
        this.levels = this.addLevels();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.closeButton,
            ...this.levels
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
        const border = this.add.image(0, 0, 'borderLevels');
        border.setScale(this.ratio);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = this.ratio * 36;

        return border;
    }

    addCloseButton() {
        const closeButton = this.add.image(0, 0, 'closeLevels');
        closeButton.setScale(this.ratio);
        closeButton.setOrigin(0, 0);
        closeButton.x = this.border.x - (this.ratio * 20);
        closeButton.y = this.border.y - (this.ratio * 20);

        closeButton.setInteractive();

        closeButton.on('pointerup', () => {
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.scene.stop('Levels');
            this.scene.start('Menu');
        });

        return closeButton;
    }

    addLevels() {
        const levels = [];

        for (let i = 0; i < LEVELS.length; i++) {
            const level = LEVELS[i];
            const levelObject = this.add.image(0, 0, `level${ i + 1 }`);
            levelObject.setOrigin(0, 0);
            levelObject.setScale(this.ratio);
            levelObject.x = (this.game.config.width - levelObject.displayWidth ) / 2;
            levelObject.y = i === 0 ?
                this.border.y + (levelObject.displayHeight * i) + (this.ratio * 25) :
                this.border.y + (levelObject.displayHeight * i) + (this.ratio * 25) + (this.ratio * 30) * i;

            levels.push(levelObject);

            if (!(this.levelId >= i)) {
                const levelLocked = this.add.image(0, 0, 'levelLocked');
                levelLocked.setOrigin(0, 0);
                levelLocked.setScale(this.ratio);
                levelLocked.x = levelObject.x + levelObject.displayWidth - levelLocked.displayWidth - (this.ratio * 10);
                levelLocked.y = levelObject.y + (levelObject.displayHeight - levelLocked.displayHeight) / 2;

                levels.push(levelLocked);
            } else {
                levelObject.setInteractive();

                levelObject.on('pointerup', () => {
                    if (getAudioType() !== 0) {
                        getAudio('clickAudio').play();
                    }

                    this.scene.stop('Levels');
                    this.scene.start('Game', { levelId: level.level - 1, leaderboard: this.leaderboard });
                });
            }
        }

        const levelInfinity = this.add.image(0, 0, 'levelInfinity');
        levelInfinity.setOrigin(0, 0);
        levelInfinity.setScale(this.ratio);
        levelInfinity.x = (this.game.config.width - levelInfinity.displayWidth ) / 2;
        levelInfinity.y = this.border.y + (this.ratio * 620);
        levelInfinity.setVisible(this.levelId + 1 === LEVELS.length);

        levelInfinity.setInteractive();

        levelInfinity.on('pointerup', () => {
            this.scene.stop('Levels');
            this.scene.start('Game', { levelId: 6, leaderboard: this.leaderboard });
        });

        levels.push(levelInfinity);

        return levels;
    }
}

export default LevelsScene;
