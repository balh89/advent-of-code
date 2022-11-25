export default (column: number, row: number, defaultValue: any) => {
  return new Array(column).fill(0).map(() => new Array(row).fill(defaultValue));
};
