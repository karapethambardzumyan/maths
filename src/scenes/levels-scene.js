import { Scene } from 'phaser';
import LEVELS from '../constants/levels';

class LevelsScene extends Scene {
    constructor() {
        super('Levels');
    }

    create() {
        this.ratio = this.game.config.width / 414;

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

        closeButton.on('pointerdown', () => {
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

            levelObject.setInteractive();

            levelObject.on('pointerdown', () => {
                this.scene.start('Game', { levelId: level.level - 1 });
            });

            levels.push(levelObject);
        }

        const levelInfinity = this.add.image(0, 0, 'levelInfinity');
        levelInfinity.setOrigin(0, 0);
        levelInfinity.setScale(this.ratio);
        levelInfinity.x = (this.game.config.width - levelInfinity.displayWidth ) / 2;
        levelInfinity.y = this.border.y + (this.ratio * 620);

        levels.push(levelInfinity);

        return levels;
    }
}

export default LevelsScene;
