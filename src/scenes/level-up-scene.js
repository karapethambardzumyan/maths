import { Scene } from 'phaser';

class LevelUpScene extends Scene {
    constructor() {
        super('LevelUp');
    }

    init(data) {
        this.levelId = data.levelId + 1;
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.header = this.addHeader();
        this.nextButton = this.addNextButton();
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
            this.scene.start('Game', { levelId: this.levelId });
        });

        return nextButton;
    }
}

export default LevelUpScene;