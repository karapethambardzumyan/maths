export default {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#cccccc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: !true
        }
    }
};