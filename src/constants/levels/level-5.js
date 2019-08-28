const LEVEL_1 = {
    level: 4,
    colors: {
        background: ['#d874e6', '#c550d6'],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*', '/'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length - 1;

export default LEVEL_1;