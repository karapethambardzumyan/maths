import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';
import { playAudio } from '../helpers/audio-manager';

class LeaderboardScene extends Scene {
    constructor() {
        super('Leaderboard');
    }

    init(data) {
        this.leaderboard = data.leaderboard;
    }

    create() {
        this.ratio = this.game.config.width / MAX_WIDTH;

        this.background = this.addBackground();
        this.borderTop = this.addBorderTop();
        this.logo = this.addLogo();
        this.title = this.addTitle();
        this.borderBottom = this.addBorderBottom();
        this.goMenuButton = this.addGoMenuButton();
        this.addPlayers();
    }

    addBackground() {
        const background = this.add.image(0, 0, 'background');
        background.setScale(this.game.config.width / background.width, this.game.config.height / background.height);
        background.setOrigin(0, 0);

        return background;
    }

    addBorderTop() {
        const borderTop = this.add.image(0, 0, 'borderTopLeaderboard');
        borderTop.setScale(this.ratio);
        borderTop.setOrigin(0, 0);
        borderTop.x = (this.game.config.width - borderTop.displayWidth) / 2;
        borderTop.y = 0;

        return borderTop;
    }

    addLogo() {
        const logo = this.add.image(0, 0, 'logoLeaderboard');
        logo.setScale(this.ratio);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = this.ratio * 20;

        return logo;
    }

    addTitle() {
        const logo = this.add.image(0, 0, 'titleLeaderboard');
        logo.setScale(this.ratio);
        logo.setOrigin(0, 0);
        logo.x = (this.game.config.width - logo.displayWidth) / 2;
        logo.y = (this.logo.y + this.logo.displayHeight) + (this.ratio * 11);

        return logo;
    }

    addBorderBottom() {
        const borderBottom = this.add.image(0, 0, 'borderBottomLeaderboard');
        borderBottom.setScale(this.ratio);
        borderBottom.setOrigin(0, 0);
        borderBottom.displayHeight = this.game.config.height - (this.title.y + this.title.displayHeight + (this.ratio * 11));
        borderBottom.x = (this.game.config.width - borderBottom.displayWidth) / 2;
        borderBottom.y = this.title.y + this.title.displayHeight + (this.ratio * 11);
        borderBottom.setDepth(1);

        return borderBottom;
    }

    addGoMenuButton() {
        const goMenuButton = this.add.image(0, 0, 'goMenuLeaderboardButton');
        goMenuButton.setScale(this.ratio);
        goMenuButton.setOrigin(0, 0);
        goMenuButton.x = (this.game.config.width - goMenuButton.displayWidth) / 2;
        goMenuButton.y = (this.game.config.height - goMenuButton.displayHeight) - (this.ratio * 8);
        goMenuButton.setDepth(2);

        goMenuButton.setInteractive();

        goMenuButton.on('pointerup', () => {
            playAudio('clickAudio');

            this.leaderboard.off('getscores');
            this.leaderboard.off('filecomplete');
            this.scene.start('Menu');
        });

        return goMenuButton;
    }

    addPlayers() {
        this.leaderboard.getScores();

        this.leaderboard.on('getscores', players => {
            const playersPictures = {};

            for (const player of players) {
                if (!this.textures.exists(player.playerID)) {
                    this.load.image(player.playerID, player.playerPhotoURL);
                    this.load.start();
                } else {
                    run(players, playersPictures, player.playerID);
                }
            }

            this.load.on('filecomplete', key => {
                run(players, playersPictures, key);
            });
        });

        const run = (players, playersPictures, key) => {
            playersPictures[key] = key;

            if (players.length === Object.values(playersPictures).length) {
                const createPanel = (scene, data) => {
                    return scene.rexUI.add.sizer({ orientation: 'y' }).add(createList(scene, data), 0, 'top', null, true);
                };

                const createList = (scene, items) => {
                    const column = 1;
                    const row = Math.ceil(items.length / column);
                    const table = scene.rexUI.add.gridSizer({ column, row });

                    let item, r, c;
                    for (let i = 0, cnt = items.length; i < cnt; i++) {
                        item = items[i];
                        r = i % row;
                        c = (i - r) / row;

                        table.add(
                            createItem(item),
                            c,
                            r,
                            'top',
                            0,
                            true
                        );
                    }

                    return scene.rexUI.add.sizer({ orientation: 'y' }).add(table, 0, 'center', 0, true);
                };

                let playerNumber = 1;
                const createItem = player => {
                    const containerObject = this.physics.scene.add.container(0, 0);
                    this.physics.world.enable(containerObject);
                    containerObject.setSize((this.game.config.width - (12 * 2 * this.ratio)) - (this.ratio * 20), this.ratio * 80);
                    containerObject.body.width = (this.game.config.width - (12 * 2 * this.ratio)) - (this.ratio * 20);
                    containerObject.body.height = this.ratio * 80;

                    const pictureKey = playersPictures[player.playerID];
                    const pictureObject = this.add.rexCircleMaskImage(0, 0, pictureKey);
                    pictureObject.setScale(80 * this.ratio / pictureObject.width);
                    pictureObject.setOrigin(0, 0);
                    pictureObject.x = -containerObject.displayOriginX + (this.ratio * 60);
                    pictureObject.y = -containerObject.displayOriginY + (playerNumber * (this.ratio * 25));

                    const circleObject = this.add.circle(0, 0, 43, Phaser.Display.Color.HexStringToColor('#ffffff').color);
                    circleObject.setScale(86 * this.ratio / circleObject.displayWidth);
                    circleObject.x = pictureObject.x + circleObject.displayWidth / 2 - this.ratio * 3;
                    circleObject.y = pictureObject.y + circleObject.displayHeight / 2 - this.ratio * 3;

                    const nameObject = this.add.text(0, 0, player.playerName, { fontFamily: 'Orbitron', fontSize: '30px' });
                    nameObject.setOrigin(0, 0);
                    nameObject.x = (circleObject.x + circleObject.displayWidth) - (this.ratio * 30);
                    nameObject.y = -containerObject.displayOriginY + playerNumber * (this.ratio * 23) + (pictureObject.displayHeight - nameObject.displayHeight) / 2;

                    const numberObject = this.add.text(0, 0, playerNumber, { fontFamily: 'Orbitron', fontSize: '30px' });
                    numberObject.setOrigin(0, 0);
                    numberObject.x = -containerObject.displayOriginX + ((this.ratio * 40) - numberObject.displayWidth) / 2;
                    numberObject.y = -containerObject.displayOriginY + playerNumber * (this.ratio * 23) + (pictureObject.displayHeight - numberObject.displayHeight) / 2;

                    const scoreObject = this.add.text(0, 0, player.score, { fontFamily: 'Orbitron', fontSize: '30px' });
                    scoreObject.setOrigin(0, 0);
                    scoreObject.x = -containerObject.displayOriginX + (this.game.config.width - (12 * 2 * this.ratio)) - (this.ratio * 20) - scoreObject.displayWidth - (this.ratio * 20);
                    scoreObject.y = -containerObject.displayOriginY + playerNumber * (this.ratio * 23) + (pictureObject.displayHeight - scoreObject.displayHeight) / 2;

                    const borderBottom = this.add.image(0, 0, 'borderBottomPlayerLeaderboard');
                    borderBottom.setOrigin(0, 0);
                    borderBottom.displayWidth = this.game.config.width - (12 * 2 * this.ratio);
                    borderBottom.x = -containerObject.displayOriginX;
                    borderBottom.y = pictureObject.y + this.ratio * 10 + pictureObject.displayHeight - 1;

                    containerObject
                        .add(numberObject)
                        .add(circleObject)
                        .add(pictureObject)
                        .add(nameObject)
                        .add(scoreObject)
                        .add(borderBottom);

                    playerNumber++;

                    return containerObject;
                };

                const playersObject = this.rexUI.add.scrollablePanel({
                    x: 12 * this.ratio,
                    y: this.borderBottom.y,
                    width: this.game.config.width - (12 * 2 * this.ratio),
                    height: this.game.config.height - (this.title.y + this.title.displayHeight),
                    scrollMode: 0,
                    panel: {
                        child: createPanel(this, players),
                        mask: true,
                    },
                    slider: false,
                    space: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        panel: 0
                    }
                });
                playersObject.setOrigin(0, 0).layout();
            }
        };
    }
}

export default LeaderboardScene;
