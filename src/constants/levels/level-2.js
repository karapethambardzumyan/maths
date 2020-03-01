const LEVEL_2 = {
    level: 2,
    colors: {
        background: [
            '#2c4a5b',
            '#2c4a5b',
            '#2c4a5b',
            '#2c4a5b',
            '#2c4a5b',
            '#2c4a5b',
            '#253f48',
            '#253f48',
            '#253f48',
            '#253f48',
            '#253f48',
            '#253f48',
            '#284f4f',
            '#284f4f',
            '#284f4f',
            '#284f4f',
            '#284f4f',
            '#284f4f',
        ],
        foreground: '#101420'
    },
    operations: ['+', '-'],
    limit: 250,
    speed: 1.1
};
LEVEL_2.answersCount = LEVEL_2.colors.background.length;

export default LEVEL_2;
