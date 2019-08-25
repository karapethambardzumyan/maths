import { Scene } from 'phaser';
import LEVELS from '../constants/levels';

class MenuScene extends Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.logo = this.addLogo();
        this.playButton = this.addPlayButton();
        this.levelObjects = this.addLevels();
    }

    addLogo() {
        const logo = this.add.image(0, 0, 'logo');
        logo.setScale(this.game.config.width / logo.width * 0.8);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = this.game.config.height * 0.04;

        return logo;
    }

    addPlayButton() {
        const playButton = this.add.image(0, 0, 'playButton');
        playButton.setScale(this.game.config.width / playButton.width * 0.6);
        playButton.setOrigin(0, 0);
        playButton.x = (this.game.config.width - playButton.displayWidth) / 2;
        playButton.y = this.logo.y + this.logo.displayHeight + 100;

        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.playButton.visible = false;

            for (const level of this.levelObjects) {
                level.visible = true;
            }
        });

        return playButton;
    }

    addLevels() {
        const levelObjects = [];

        for (let i = 0; i < LEVELS.length; i++) {
            const level = LEVELS[i];

            const levelObject = this.add.text(0, 0, `Level ${ level.level }`, { fontSize: 32 });
            levelObject.x = (this.game.config.width - levelObject.displayWidth) / 2;
            levelObject.y = (this.logo.y + this.logo.displayHeight + 10) + (levelObject.height * i);
            levelObject.visible = false;

            levelObject.setInteractive();

            levelObject.on('pointerdown', () => {
                this.scene.start('Game', { levelId: level.level - 1 });
            });

            levelObjects.push(levelObject);
        }

        return levelObjects;
    }
}

export default MenuScene;