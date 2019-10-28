import { Scene } from 'phaser';
import { MAX_WIDTH } from '../constants';
import { getAudioType, getAudio } from '../helpers/audio-manager';

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
        this.border = this.addBorder();
        this.logo = this.addLogo();
        this.title = this.addTitle();
        this.goMenuButton = this.addGoMenuButton();
        this.addPlayers(() => {
            this.menu = this.add.container(0, 0, [
                this.border,
                this.logo,
                this.title,
                this.goMenuButton
            ]);

            this.menu.y = (this.game.config.height - this.menu.getBounds().height) / 2;
        });
    }

    addBackground() {
        const background = this.add.image(0, 0, 'background');
        background.setScale(this.game.config.width / background.width, this.game.config.height / background.height);
        background.setOrigin(0, 0);

        return background;
    }

    addBorder() {
        const border = this.add.image(0, 0, 'borderLeaderboard');
        border.setScale(this.game.config.width / border.width, this.game.config.height / border.height);
        border.setOrigin(0, 0);
        border.x = (this.game.config.width - border.displayWidth) / 2;
        border.y = 0;

        return border;
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
        logo.y = (this.logo.y + this.logo.displayHeight) + this.ratio * 9;

        return logo;
    }

    addGoMenuButton() {
        const goMenuButton = this.add.image(0, 0, 'goMenuLeaderboardButton');
        goMenuButton.setScale(this.ratio);
        goMenuButton.setOrigin(0, 0);
        goMenuButton.x = (this.game.config.width - goMenuButton.displayWidth) / 2;
        goMenuButton.y = (this.game.config.height - goMenuButton.displayHeight) - this.ratio * 12;

        goMenuButton.setInteractive();

        goMenuButton.on('pointerup', () => {
            if (getAudioType() !== 0) {
                getAudio('clickAudio').play();
            }

            this.leaderboard.off('getscores');
            this.leaderboard.off('filecomplete');
            this.scene.start('Menu');
        });

        return goMenuButton;
    }

    addPlayers(callback) {
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

                    const numberObject = this.add.text(0, 0, playerNumber, { fontFamily: 'Orbitron', fontSize: '30px' });
                    numberObject.setOrigin(0, 0);
                    numberObject.x = -containerObject.displayOriginX + ((this.ratio * 40) - numberObject.displayWidth) / 2;
                    numberObject.y = -containerObject.displayOriginY + playerNumber * (this.ratio * 23) + (pictureObject.displayHeight - numberObject.displayHeight) / 2;

                    const scoreObject = this.add.text(0, 0, player.score, { fontFamily: 'Orbitron', fontSize: '30px' });
                    scoreObject.setOrigin(0, 0);
                    scoreObject.x = -containerObject.displayOriginX + (this.game.config.width - (12 * 2 * this.ratio)) - (this.ratio * 20) - scoreObject.displayWidth - (this.ratio * 20);
                    scoreObject.y = -containerObject.displayOriginY + playerNumber * (this.ratio * 23) + (pictureObject.displayHeight - scoreObject.displayHeight) / 2;

                    const borderBottom = this.add.image(0, 0, 'borderBottomLeaderboard');
                    borderBottom.setOrigin(0, 0);
                    borderBottom.displayWidth = this.game.config.width - (12 * 2 * this.ratio);
                    borderBottom.x = -containerObject.displayOriginX;
                    borderBottom.y = pictureObject.y + this.ratio * 10 + pictureObject.displayHeight - 1;

                    containerObject
                        .add(numberObject)
                        .add(circleObject)
                        .add(pictureObject)
                        .add(scoreObject)
                        .add(borderBottom);

                    playerNumber++;

                    return containerObject;
                };

                const playersObject = this.rexUI.add.scrollablePanel({
                    x: 12 * this.ratio,
                    y: this.title.y + this.title.displayHeight + (10 * this.ratio),
                    width: this.game.config.width - (12 * 2 * this.ratio),
                    height: this.game.config.height - (this.title.y + this.title.displayHeight) - (27 * this.ratio),
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

                return callback();
            }
        };
    }
}

export default LeaderboardScene;
