import { Scene } from 'phaser';

class Play extends Scene {
    constructor() {
        super();
    }

    preload() {
        console.log('preload');
    }
}

export default Play;