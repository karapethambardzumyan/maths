import '../src/index.scss';
import Phaser from 'phaser';
import config from './config';
import LoadingScene from './scenes/loading-scene';
import MenuScene from './scenes/menu-scene';
import GameScene from './scenes/game-scene';

class Game extends Phaser.Game {
    constructor () {
        super(config);

        this.scene.add('Loading', LoadingScene);
        this.scene.add('Menu', MenuScene);
        this.scene.add('Game', GameScene);

        this.scene.start('Loading');
    }

}

window.onload = () => {
    window.game = new Game();
};