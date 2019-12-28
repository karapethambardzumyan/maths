const LEVEL_3 = {
    level: 3,
    colors: {
        background: [
            '#69d282',
            '#69d282'
        ],
        foreground: '#47694f'
    },
    operations: ['+', '-', '*'],
    limit: 350,
    speed: 1.2
};
LEVEL_3.answersCount = LEVEL_3.colors.background.length;

export default LEVEL_3;
