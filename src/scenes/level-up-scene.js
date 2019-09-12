import { Scene } from 'phaser';
import LEVELS from '../constants/levels';

class LevelUpScene extends Scene {
    constructor() {
        super('LevelUp');
    }

    init(data) {
        this.levelId = data.levelId + 1;
        this.level = LEVELS[this.levelId - 1];

        this.facebook.on('savedata', data => {
            this.facebook.getData(['levelId']);
        });

        this.facebook.saveData({ levelId: this.levelId });
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.header = this.addHeader();
        this.nextButton = this.addNextButton();

        this.cameras.main.setBackgroundColor(this.level.colors.background[0]);
    }

    addHeader() {
        const header = this.add.text(0, 0, 'Level Up', { fontSize: 30 });
        header.x = (this.game.config.width - header.width) / 2;
        header.y = 30;

        return header;
    }

    addNextButton() {
        const nextButton = this.add.text(0, 0, 'Next level', { fontSize: 40 });
        nextButton.x = (this.game.config.width - nextButton.width) / 2;
        nextButton.y = this.header.y + this.header.height + 100;

        nextButton.setInteractive();

        nextButton.on('pointerdown', () => {
            if (this.levelId <= LEVELS.length - 1) {
                this.scene.start('Game', { levelId: this.levelId });
            } else {
                alert('Yoi win the Game!!!');
            }
        });

        return nextButton;
    }
}

export default LevelUpScene;
