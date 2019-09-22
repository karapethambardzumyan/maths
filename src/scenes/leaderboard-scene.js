import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';

class LeaderboardScene extends Scene {
    constructor() {
        super('Leaderboard');
    }

    init(data) {
        this.leaderboard = data.leaderboard;
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.logo = this.addLogo();
        this.title = this.addTitle();
        this.goMenuButton = this.addGoMenuButton();
        this.addPlayers(players => {
            this.menu = this.add.container(0, 0, [
                this.border,
                this.logo,
                this.title,
                players,
                this.goMenuButton
            ]);

            this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
        });
    }

    addBackground() {
        const background = this.add.image(0, 0, 'background');
        background.setScale(this.game.config.width / background.width, this.game.config.height / background.height);
        background.setOrigin(0, 0);

        return background;
    }

    addBorder() {
        const border = this.add.image(0, 0, 'borderLeaderboard');
        border.setScale(this.game.config.width / border.width, this.game.config.height / border.height);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = 0;

        return border;
    }

    addLogo() {
        const logo = this.add.image(0, 0, 'logoLeaderboard');
        logo.setScale(this.ratio);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = this.ratio * 22;

        return logo;
    }

    addTitle() {
        const logo = this.add.image(0, 0, 'titleLeaderboard');
        logo.setScale(this.ratio);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = (this.logo.y + this.logo.displayHeight) + this.ratio * 24;

        return logo;
    }

    addGoMenuButton() {
        const goMenuButton = this.add.image(0, 0, 'goMenuLeaderboardButton');
        goMenuButton.setScale(this.ratio);
        goMenuButton.setOrigin(0, 0);
        goMenuButton.x = (this.game.config.width - goMenuButton.displayWidth) / 2;
        goMenuButton.y = (this.game.config.height - goMenuButton.displayHeight) - this.ratio * 12;

        goMenuButton.setInteractive();

        goMenuButton.on('pointerup', () => {
            this.leaderboard.off('getscores');
            this.leaderboard.off('filecomplete');
            this.scene.start('Menu');
        });

        return goMenuButton;
    }

    addPlayers(callback) {
        this.leaderboard.getScores();

        this.leaderboard.on('getscores', scores => {
            const players = [];
            const playersList = scores;

            let i;
            for (i = 0; i < playersList.length; i++) {
                if (!this.textures.exists(`player${ i + 1 }`)) {
                    this.load.image(`player${ i + 1 }`, playersList[i].playerPhotoURL);
                    this.load.start()
                } else {

                }
            }

            this.load.on('filecomplete', key => {
                const numberObject = this.add.bitmapText(0, 0, 'atari', players.length + 1, 30);
                numberObject.x = 0;
                numberObject.y = 0;

                const pictureObject = this.add.image(0, 0, key);
                pictureObject.setScale(100 / pictureObject.width);
                pictureObject.setOrigin(0, 0);
                pictureObject.x = numberObject.width;
                pictureObject.y = 0;

                const scoreObject = this.add.bitmapText(0, 0, 'atari', playersList[players.length].score, 30);
                scoreObject.x = pictureObject.x + pictureObject.displayWidth;
                scoreObject.y = 0;

                const nameObject = this.add.bitmapText(0, 0, 'atari', playersList[players.length].playerName, 30);
                nameObject.x = pictureObject.x + pictureObject.displayWidth;
                nameObject.y = scoreObject.y + scoreObject.height;

                const containerObject = this.add.container(0, players.length * pictureObject.displayHeight, [numberObject, pictureObject, scoreObject, nameObject]);
                this.physics.world.enable(containerObject);

                players.push(containerObject);

                if (i === playersList.length) {
                    const containerObject = this.add.container(0, 0, [...players]);
                    this.physics.world.enable(containerObject);
                    containerObject.x = (this.game.config.width - (containerObject.list[0].list[0].width + containerObject.list[0].list[1].displayWidth + containerObject.list[0].list[2].width + containerObject.list[0].list[0].width)) / 2;
                    containerObject.y = (this.title.y + this.title.displayHeight) + this.ratio * 10;

                    return callback(containerObject);
                }
            }, this);
        }, this);
    }

}

export default LeaderboardScene;
