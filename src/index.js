import '../src/index.scss';
import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/game-scene';

class Game extends Phaser.Game {
    constructor () {
        super(config);

        this.scene.add('Game', GameScene);
    }

    startGameScene() {
        document.querySelector('.wrapper').style.zIndex = '-1';

        this.scene.start('Game');
    }
}

window.onload = () => {
    window.game = new Game();
    window.game.startGameScene();
};