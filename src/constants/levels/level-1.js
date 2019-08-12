const LEVEL_1 = {
    level: 1,
    colors: {
        background: ['#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#00BFFF', '#B0C4DE', '#1E90FF', '#6495ED', '#4682B4', '#4169E1', '#0000FF', '#0000CD', '#00008B', '#000080', '#191970', '#7B68EE'],
        foreground: ['#152B3E', '#122636', '#10202F', '#0D1B27', '#0B151F', '#081017', '#050B0F', '#030508', '#004D6C', '#00435F', '#003A51', '#003044', '#002736', '#001D29', '#00131B', '#000A0E']
    },
    operations: ['+'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length - 1;

export default LEVEL_1;