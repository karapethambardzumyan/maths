import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';

class PauseScene extends Scene {
    constructor() {
        super('Pause');
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.border = this.addBorder();
        this.pause = this.addPause();

        this.menu = this.add.container(0, 0, [
            this.border,
            this.pause
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
        const border = this.add.image(0, 0, 'borderPause');
        border.setScale(this.ratio);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = 0;

        return border;
    }

    addPause() {
        const pause = this.add.image(0, 0, 'pause');
        pause.setScale(this.ration);
        pause.setOrigin(0, 0);
        pause.x = (this.game.config.width - pause.displayWidth) / 2;
        pause.y = 0;

        return pause;
    }
}

export default PauseScene;
