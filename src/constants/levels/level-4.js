const LEVEL_4 = {
    level: 4,
    colors: {
        background: [
            '#ceb345',
            '#ceb345',
            '#ceb345',
            '#ceb345',
            '#ceb345',
            '#ceb345',
            '#b08935',
            '#b08935',
            '#b08935',
            '#b08935',
            '#b08935',
            '#b08935',
            '#aa7435',
            '#aa7435',
            '#aa7435',
            '#aa7435',
            '#aa7435',
            '#aa7435',
        ],
        foreground: '#0c130f'
    },
    operations: ['+', '-', '*'],
    limit: 450,
    speed: 1.3
};
LEVEL_4.answersCount = LEVEL_4.colors.background.length;

export default LEVEL_4;
