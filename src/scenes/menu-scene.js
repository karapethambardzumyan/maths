import { Scene } from 'phaser';

class MenuScene extends Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.logo = this.addLogo();
        this.addPlayButton();
    }

    update() {

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
            this.scene.start('Game');
        });

        return playButton;
    }
}

export default MenuScene;