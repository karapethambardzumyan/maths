import '../src/index.scss';
import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/game-scene';
import MenuScene from './scenes/menu-scene';

class Game extends Phaser.Game {
    constructor () {
        super(config);

        this.scene.add('Game', GameScene);
        this.scene.add('Menu', MenuScene);

        this.scene.start('Menu');
    }

}

window.onload = () => {
    window.game = new Game();
};