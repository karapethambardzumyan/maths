import './index.scss';
import Play from './scenes/play';

import { GAME } from './config';

const gameConfig = {
    type: Phaser.AUTO,
    width: GAME.width,
    height: GAME.height,
    scene: [Play],
    backgroundColor: '#cccccc',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

new Phaser.Game(gameConfig);