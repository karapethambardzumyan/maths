export const getRandomInt = (min, max, exceptions = []) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const int = Math.floor(Math.random() * (max - min + 1)) + min;

    return exceptions.indexOf(int) === -1 ? int : getRandomInt(min, max, exceptions);
};