import '../src/index.scss';
import Phaser from 'phaser';
import config from './config';
import LoadingScene from './scenes/loading-scene';
import LevelsScene from './scenes/levels-scene';
import MenuScene from './scenes/menu-scene';
import GameScene from './scenes/game-scene';
import GameOverScene from './scenes/game-over-scene';
import LevelUpScene from './scenes/level-up-scene';

class Game extends Phaser.Game {
    constructor () {
        super(config);

        this.scene.add('Loading', LoadingScene);
        this.scene.add('Menu', MenuScene);
        this.scene.add('Levels', LevelsScene);
        this.scene.add('Game', GameScene);
        this.scene.add('GameOver', GameOverScene);
        this.scene.add('LevelUp', LevelUpScene);

        this.scene.start('Loading');
    }

}

window.onload = () => {
    FBInstant.initializeAsync().then(function() {
        window.game = new Game();
    });
};
