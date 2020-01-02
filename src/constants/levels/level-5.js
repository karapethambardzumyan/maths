const LEVEL_5 = {
    level: 5,
    colors: {
        background: [
            '#d874e6',
            '#d874e6'
        ],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*', '/'],
    limit: 450,
    speed: 1.5
};
LEVEL_5.answersCount = LEVEL_5.colors.background.length;

export default LEVEL_5;
