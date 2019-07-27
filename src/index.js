import './index.scss';
import Play from './scenes/play';

const gameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    scene: [Play],
    backgroundColor: '#cccccc'
};

new Phaser.Game(gameConfig);