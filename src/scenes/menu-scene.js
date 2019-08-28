import { Scene } from 'phaser';

class MenuScene extends Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.cameras.main.setBackgroundColor('#3b5d73');

        this.logo = this.addLogo();
        this.border = this.addBorder();
        this.leadernoard = this.addLeaderboard();
        this.playButton = this.addPlayButton();
        this.soonMode = this.addSoonMode();
        this.soonChallenges = this.addSoonChallenges();

        this.menu = this.add.container(0, 0, [this.logo, this.border, this.leadernoard, this.playButton, this.soonMode, this.soonChallenges]);
        this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
    }

    addLogo() {
        const logo = this.add.image(0, 0, 'logo');
        logo.setScale(this.game.config.width / logo.width * 0.8);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = 0;

        return logo;
    }

    addBorder() {
        const border = this.add.image(0, 0, 'border');
        border.setScale(this.game.config.width / border.width * 0.8);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = this.logo.y + this.logo.displayHeight + 10;

        return border;
    }

    addLeaderboard() {
        const leaderboard = this.add.image(0, 0, 'leaderboard');
        leaderboard.setScale(this.game.config.width / leaderboard.width * 0.15);
        leaderboard.setOrigin(0, 0);
        leaderboard.x = this.border.x + 15;
        leaderboard.y = this.border.y + 10;

        return leaderboard;
    }

    addPlayButton() {
        const playButton = this.add.image(0, 0, 'playButton');
        playButton.setScale(this.game.config.width / playButton.width * 0.6);
        playButton.setOrigin(0, 0);
        playButton.x = (this.game.config.width - playButton.displayWidth) / 2;
        playButton.y = this.border.y + (220 * this.border.displayHeight / this.border.height) + ((1090 * this.border.displayHeight / this.border.height) - (playButton.displayHeight * 3)) / 4;

        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.stop('Menu');
            this.scene.start('Levels');
        });

        return playButton;
    }

    addSoonMode() {
        const soonButton = this.add.image(0, 0, 'soonButton');
        soonButton.setScale(this.game.config.width / soonButton.width * 0.6);
        soonButton.setOrigin(0, 0);
        soonButton.x = (this.game.config.width - soonButton.displayWidth) / 2;
        soonButton.y = this.playButton.y + this.playButton.displayHeight + ((1090 * this.border.displayHeight / this.border.height) - (soonButton.displayHeight * 3)) / 4;

        return soonButton;
    }

    addSoonChallenges() {
        const soonButton = this.add.image(0, 0, 'soonButton');
        soonButton.setScale(this.game.config.width / soonButton.width * 0.6);
        soonButton.setOrigin(0, 0);
        soonButton.x = (this.game.config.width - soonButton.displayWidth) / 2;
        soonButton.y = this.soonMode.y + this.soonMode.displayHeight + ((1090 * this.border.displayHeight / this.border.height) - (soonButton.displayHeight * 3)) / 4;

        return soonButton;
    }
}

export default MenuScene;
