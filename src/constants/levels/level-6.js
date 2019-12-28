const LEVEL_6 = {
    level: 6,
    colors: {
        background: [
            '#d874e6',
            '#d874e6'
        ],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*', '/'],
    limit: 500,
    speed: 1.5
};
LEVEL_6.answersCount = LEVEL_6.colors.background.length;

export default LEVEL_6;
