const LEVEL_4 = {
    level: 4,
    colors: {
        background: ['#d874e6', '#69d282'],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*', '/'],
    limit: 150,
    speed: 1
};
LEVEL_4.answersCount = LEVEL_4.colors.background.length;

export default LEVEL_4;
