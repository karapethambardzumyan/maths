const LEVEL_1 = {
    level: 1,
    colors: {
        background: [
            '#577491',
            '#577491',
            '#577491',
            '#577491',
            '#577491',
            '#577491',
            '#496179',
            '#496179',
            '#496179',
            '#496179',
            '#496179',
            '#496179',
            '#304761',
            '#304761',
            '#304761',
            '#304761',
            '#304761',
            '#304761',
        ],
        foreground: '#101420'
    },
    operations: ['+', '-'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length;

export default LEVEL_1;
