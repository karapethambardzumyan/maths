import './index.scss';
import Play from './scenes/play';

window.onload = () => {
    const gameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
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

    let game = new Phaser.Game(gameConfig);

    game.scale.startFullscreen();
};