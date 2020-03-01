const LEVEL_5 = {
    level: 5,
    colors: {
        background: [
            '#963430',
            '#963430',
            '#963430',
            '#963430',
            '#963430',
            '#963430',
            '#82241e',
            '#82241e',
            '#82241e',
            '#82241e',
            '#82241e',
            '#82241e',
            '#571d1b',
            '#571d1b',
            '#571d1b',
            '#571d1b',
            '#571d1b',
            '#571d1b'
        ],
        foreground: '#180d01'
    },
    operations: ['+', '-', '*'],
    limit: 550,
    speed: 1.4
};
LEVEL_5.answersCount = LEVEL_5.colors.background.length;

export default LEVEL_5;
