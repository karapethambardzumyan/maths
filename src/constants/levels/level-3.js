const LEVEL_3 = {
    level: 3,
    colors: {
        background: [
            '#253f48',
            '#253f48',
            '#253f48',
            '#253f48',
            '#253f48',
            '#253f48',
            '#3f6e45',
            '#3f6e45',
            '#3f6e45',
            '#3f6e45',
            '#3f6e45',
            '#3f6e45',
            '#508953',
            '#508953',
            '#508953',
            '#508953',
            '#508953',
            '#508953',
        ],
        foreground: '#0e191f'
    },
    operations: ['+', '-', '*'],
    limit: 350,
    speed: 1.2
};
LEVEL_3.answersCount = LEVEL_3.colors.background.length;

export default LEVEL_3;
