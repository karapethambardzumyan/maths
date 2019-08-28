import { Scene } from 'phaser';
import LEVELS from '../constants/levels';

class LevelsScene extends Scene {
    constructor() {
        super('Levels');
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.border = this.addBorder();
        this.closeButton = this.addCloseButton();
        this.levelObjects = this.addLevels();

        this.menu = this.add.container(0, 0, [this.border, this.closeButton, ...this.levelObjects]);
        this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
    }

    addBorder() {
        const border = this.add.image(0, 0, 'borderLevels');
        border.setScale(this.game.config.height / 1920);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;

        return border;
    }

    addCloseButton() {
        const closeButton = this.add.image(0, 0, 'closeLevels');
        closeButton.setScale(this.game.config.height / 1920);
        closeButton.setOrigin(0, 0);
        closeButton.x = ((this.game.config.width - this.border.displayWidth) / 2) - (55 * this.game.config.width / 949);
        closeButton.y = -(55 * this.game.config.height / 1571);

        closeButton.setInteractive();

        closeButton.on('pointerdown', () => {
            this.scene.stop('Levels');
            this.scene.start('Menu');
        });

        return closeButton;
    }

    addLevels() {
        const levelObjects = [];

        for (let i = 0; i < LEVELS.length; i++) {
            const level = LEVELS[i];

            const levelObject = this.add.image(0, 0, `level${ i + 1 }`);
            levelObject.setOrigin(0, 0);
            levelObject.setScale(this.game.config.width / 1080);
            levelObject.x = (this.game.config.width - levelObject.displayWidth ) / 2;
            levelObject.y = (60 * (this.game.config.height / 1566)) * (i + 1) + (levelObject.displayHeight * i);

            levelObject.setInteractive();

            levelObject.on('pointerdown', () => {
                this.scene.start('Game', { levelId: level.level - 1 });
            });

            levelObjects.push(levelObject);
        }

        return levelObjects;
    }
}

export default LevelsScene;
