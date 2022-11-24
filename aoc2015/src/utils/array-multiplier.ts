export default (times: number) => {
    return (array: Array<number>) => {
        return array.reduce((acc: number, el: number) => {
            acc += el * times;
            return acc;
        }, 0);
    }
}