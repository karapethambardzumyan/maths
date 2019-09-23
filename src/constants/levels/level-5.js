const LEVEL_5 = {
    level: 5,
    colors: {
        background: ['#d874e6', '#69d282'],
        foreground: '#452f48'
    },
    operations: ['+', '-', '*', '/'],
    limit: 150,
    speed: 1
};
LEVEL_5.answersCount = LEVEL_5.colors.background.length;

export default LEVEL_5;
