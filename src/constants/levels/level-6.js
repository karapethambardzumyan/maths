const LEVEL_6 = {
    level: 6,
    colors: {
        background: [
            '#5e211e',
            '#5e211e',
            '#5e211e',
            '#5e211e',
            '#5e211e',
            '#5e211e',
            '#441616',
            '#441616',
            '#441616',
            '#441616',
            '#441616',
            '#441616',
            '#300709',
            '#300709',
            '#300709',
            '#300709',
            '#300709',
            '#300709'
        ],
        foreground: '#0b0a0a'
    },
    operations: ['+', '-', '*', '/'],
    limit: 650,
    speed: 1.4
};
LEVEL_6.answersCount = LEVEL_6.colors.background.length;

export default LEVEL_6;
