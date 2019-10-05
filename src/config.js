import RoundRectanglePlugin from '../node_modules/phaser3-rex-notes-master/plugins/roundrectangle-plugin';
import WebFontLoaderPlugin from '../node_modules/phaser3-rex-notes-master/plugins/webfontloader-plugin';
import UIPlugin from '../node_modules/phaser3-rex-notes-master/templates/ui/ui-plugin.js';
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
            },
            {
                key: 'WebFontLoader',
                plugin: WebFontLoaderPlugin,
                start: true
            }
        ],
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};
