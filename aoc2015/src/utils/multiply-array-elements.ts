export default (array: Array<number>) => {
    return array.reduce((acc: number, el: number) => {
        acc *= el;
        return acc;
    });
}