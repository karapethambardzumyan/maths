import { Scene } from 'phaser';

class MenuScene extends Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.ratio = this.game.config.height / 736;

        this.background = this.addBackground();
        this.logo = this.addLogo();
        this.border = this.addBorder();
        this.topbar = this.addTopbar();
        this.leaderboardButton = this.addLeaderboardButton();
        this.noAdsButton = this.addNoAdsButton();
        this.soundOnButton = this.addSoundOnButton();
        this.playButton = this.addPlayButton();
        this.soonMode = this.addSoonMode();
        this.soonChallenges = this.addSoonChallenges();

        this.menu = this.add.container(0, 0, [
            this.logo,
            this.border,
            this.topbar,
            this.leaderboardButton,
            this.noAdsButton,
            this.soundOnButton,
            this.playButton,
            this.soonMode,
            this.soonChallenges
        ]);
        this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
    }

    addBackground() {
        const background = this.add.image(0, 0, 'background');
        background.setScale(this.game.config.width / background.width, this.game.config.height / background.height);
        background.setOrigin(0, 0);

        return background;
    }

    addLogo() {
        const logo = this.add.image(0, 0, 'logo');
        logo.setScale(this.ratio);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = this.ratio * 40;

        return logo;
    }

    addBorder() {
        const border = this.add.image(0, 0, 'borderMenu');
        border.setScale(this.ratio);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = this.logo.y + this.logo.displayHeight + (this.ratio * 14);

        return border;
    }

    addTopbar() {
        const topbar = this.add.image(0, 0, 'topbar');
        topbar.setScale(this.ratio);
        topbar.setOrigin(0, 0);
        topbar.x = this.border.x + (this.ratio * 10);
        topbar.y = this.border.y + (this.ratio * 12);

        return topbar;
    }

    addLeaderboardButton() {
        const leaderboardButton = this.add.image(0, 0, 'leaderboardButtonSprite');
        leaderboardButton.setScale(this.ratio);
        leaderboardButton.setOrigin(0, 0);
        leaderboardButton.x = this.topbar.x + (this.ratio * 8);
        leaderboardButton.y = this.topbar.y + (this.ratio * 11);

        leaderboardButton.setInteractive();

        leaderboardButton.on('pointerdown', () => {
            leaderboardButton.setFrame(1);
        });

        leaderboardButton.on('pointerout', () => {
            leaderboardButton.setFrame(0);
        });

        return leaderboardButton;
    }

    addNoAdsButton() {
        const noAdsButton = this.add.image(0, 0, 'noAdsButton');
        noAdsButton.setScale(this.ratio);
        noAdsButton.setOrigin(0, 0);
        noAdsButton.x = this.topbar.x + (this.ratio * 89);
        noAdsButton.y = this.topbar.y + (this.ratio * 4);

        noAdsButton.setInteractive();

        noAdsButton.on('pointerdown', () => {
            console.log('pointerdown');
        });

        return noAdsButton;
    }

    addSoundOnButton() {
        const soundButton = this.add.image(0, 0, 'soundOnButton');
        soundButton.setScale(this.ratio);
        soundButton.setOrigin(0, 0);
        soundButton.x = this.topbar.x + (this.ratio * 169);
        soundButton.y = this.topbar.y + (this.ratio * 2);

        soundButton.setInteractive();

        soundButton.on('pointerdown', () => {
            console.log('pointerdown');
        });

        return soundButton;
    }

    addPlayButton() {
        const playButton = this.add.image(0, 0, 'playButton');
        playButton.setScale(this.ratio);
        playButton.setOrigin(0, 0);
        playButton.x = (this.game.config.width - playButton.displayWidth) / 2;
        playButton.y = this.border.y + (this.ratio * 114);

        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            playButton.setFrame(1);
        });

        playButton.on('pointerup', () => {
            playButton.setFrame(0);

            this.scene.stop('Menu');
            this.scene.start('Levels');
        });

        playButton.on('pointerout', () => {
            playButton.setFrame(0);
        });

        return playButton;
    }

    addSoonMode() {
        const soonButton = this.add.image(0, 0, 'soonButton');
        soonButton.setScale(this.ratio);
        soonButton.setOrigin(0, 0);
        soonButton.x = (this.game.config.width - soonButton.displayWidth) / 2;
        soonButton.y = this.border.y + (this.ratio * 250);

        return soonButton;
    }

    addSoonChallenges() {
        const soonButton = this.add.image(0, 0, 'soonButton');
        soonButton.setScale(this.ratio);
        soonButton.setOrigin(0, 0);
        soonButton.x = (this.game.config.width - soonButton.displayWidth) / 2;
        soonButton.y = this.border.y + (this.ratio * 380);

        return soonButton;
    }
}

export default MenuScene;
