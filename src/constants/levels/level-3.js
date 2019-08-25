const LEVEL_1 = {
    level: 3,
    colors: {
        background: ['#69d282', '#2fd055'],
        foreground: '#47694f'
    },
    operations: ['+', '-', '*'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length - 1;

export default LEVEL_1;