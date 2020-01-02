const LEVEL_4 = {
    level: 4,
    colors: {
        background: [
            '#d874e6',
            '#d874e6'
        ],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*'],
    limit: 400,
    speed: 1.5
};
LEVEL_4.answersCount = LEVEL_4.colors.background.length;

export default LEVEL_4;
