import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';

class LeaderboardScene extends Scene {
    constructor() {
        super('Leaderboard');
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.logo = this.addLogo();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.logo
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
}

export default LeaderboardScene;
