const LEVEL_1 = {
    level: 1,
    colors: {
        background: ['#943737', '#88371b', '#de4d1a', '#d45d34', '#bd6f54'],
        foreground: '#6f5c5c'
    },
    operations: ['+', '-'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length - 1;

export default LEVEL_1;