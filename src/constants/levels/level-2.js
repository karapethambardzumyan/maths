const LEVEL_1 = {
    level: 2,
    colors: {
        background: ['#943737', '#88371b'],
        foreground: '#6f5c5c'
    },
    operations: ['+', '-'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length - 1;

export default LEVEL_1;