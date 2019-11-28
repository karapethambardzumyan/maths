import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';
import { getAudio, getAudioType, setAudioType } from '../helpers/audio-manager';


class MenuScene extends Scene {
    constructor() {
        super('Menu');
    }

    init(data) {
        this.leaderboard = data.leaderboard;
        this.levelId = data.levelId;
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.logo = this.addLogo();
        this.border = this.addBorder();
        this.topbar = this.addTopbar();
        this.leaderboardButton = this.addLeaderboardButton();
        this.noAdsButton = this.addNoAdsButton();
        this.soundOnButton = this.addSoundsButton();
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
        const leaderboardButton = this.add.image(0, 0, 'leaderboardButton');
        leaderboardButton.setScale(this.ratio);
        leaderboardButton.setOrigin(0, 0);
        leaderboardButton.x = this.topbar.x + (this.ratio * 8);
        leaderboardButton.y = this.topbar.y + (this.ratio * 11);

        leaderboardButton.setInteractive();

        leaderboardButton.on('pointerdown', () => {
            leaderboardButton.setFrame(1);
        });

        leaderboardButton.on('pointerup', () => {
            leaderboardButton.setFrame(0);

            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.scene.stop('Menu');
            this.scene.start('Leaderboard', { levelId: this.levelId, leaderboard: this.leaderboard });
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

        });

        return noAdsButton;
    }

    addSoundsButton() {
        const soundsButton = this.add.image(0, 0, 'soundsButton');
        soundsButton.setScale(this.ratio);
        soundsButton.setOrigin(0, 0);
        soundsButton.x = this.topbar.x + (this.ratio * 169);
        soundsButton.y = this.topbar.y + (this.ratio * 2);

        soundsButton.setInteractive();
        soundsButton.setFrame(getAudioType());

        soundsButton.on('pointerup', () => {
            switch (getAudioType()) {
                case 0:
                    setAudioType(1);
                    break;
                case 1:
                    setAudioType(2);
                    break;
                case 2:
                    setAudioType(0);
                    break;
            }

            getAudio('clickAudio').play();
            soundsButton.setFrame(getAudioType());
         });

        return soundsButton;
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
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            playButton.setFrame(0);

            this.scene.stop('Menu');
            this.scene.start('Levels', { levelId: this.levelId, leaderboard: this.leaderboard});
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
