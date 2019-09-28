import RoundRectanglePlugin from 'phaser/plugins/roundrectangle-plugin';
import { MAX_WIDTH, MAX_HEIGHT } from './constants';

const width = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
const height = window.innerWidth > MAX_WIDTH ? MAX_HEIGHT : window.innerHeight;

export default {
    type: Phaser.AUTO,
    width: width,
    height: height,
    backgroundColor: '#cccccc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    plugins: {
        global: [
            {
                key: 'rexRoundRectanglePlugin',
                plugin: RoundRectanglePlugin,
                start: true
            }
        ]
    }
};
