import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';
import {getRandomInt} from '../helpers/numbers';

class LeaderboardScene extends Scene {
    constructor() {
        super('Leaderboard');
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.logo = this.addLogo();
        this.title = this.addTitle();
        this.players = this.addPlayers();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.logo,
            this.title,
            this.players
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

    addPlayers() {
        const players = [];
        const playersList = [1, 2, 3];

        this.facebook.on('getleaderboard', leaderboard => {
            this.leaderboard = leaderboard;

            this.leaderboard.on('getscores', scores =>{
                console.log(scores);
            }, this);

            this.leaderboard.getScores();
        }, this);

        this.facebook.getLeaderboard('test-board');


        for (let i = 0; i < playersList.length; i++) {
            const numberObject = this.add.bitmapText(0, 0, 'atari', i + 1, 30);
            numberObject.x = 0;
            numberObject.y = 0;

            const containerObject = this.add.container(0, i * numberObject.height, [numberObject]);
            this.physics.world.enable(containerObject);

            players.push(containerObject);
        }

        const containerObject = this.add.container(0, 0, [...players]);
        this.physics.world.enable(containerObject);
        containerObject.x = (this.game.config.width - containerObject.list[0].list[0].width) / 2;
        containerObject.y = (this.title.y + this.title.displayHeight) + this.ratio * 10;

        return containerObject;
    }

}

export default LeaderboardScene;
