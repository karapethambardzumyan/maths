const LEVEL_1 = {
    level: 1,
    colors: {
        background: [
            '#15242f',
            '#15242f'
        ],
        foreground: '#004a6a'
    },
    operations: ['+', '-'],
    limit: 150,
    speed: 1.5
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length;

export default LEVEL_1;
