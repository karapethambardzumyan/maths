const LEVEL_6 = {
    level: 5,
    colors: {
        background: ['#d874e6'],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*', '/'],
    limit: 150,
    speed: 1
};
LEVEL_6.answersCount = LEVEL_6.colors.background.length;

export default LEVEL_6;
