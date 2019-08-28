const LEVEL_1 = {
    level: 1,
    colors: {
        background: ['#15242f', '#182934', '#1b2c3a', '#1f3340', '#243848', '#274253', '#324e61', '#375a6d', '#3b5d73', '#476d87', '#507b97', '#51819c', '#628399', '#708ca3', '#8096aa', '#8d9fb3', '#98a3b9', '#a5afc2', '#b4b8cc', '#bcc0d2'],
        foreground: '#004a6a'
    },
    operations: ['+'],
    limit: 150,
    speed: 1
};
LEVEL_1.answersCount = LEVEL_1.colors.background.length - 1;

export default LEVEL_1;
