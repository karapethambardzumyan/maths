import './index.scss';
import Play from './scenes/play';

window.onload = () => {
    const gameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
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
};