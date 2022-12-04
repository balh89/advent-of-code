import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const ranges = [...input.matchAll(/(?<x1>\d{1,2})-(?<y1>\d{1,2}),(?<x2>\d{1,2})-(?<y2>\d{1,2})/g)];
  return ranges.reduce((overlappingRanges, range) => {
    const isOverlapping = compareRanges(range.groups)
    return overlappingRanges + +isOverlapping;
  }, 0)

  function compareRanges(range) {
    const { x1, x2, y1, y2 } = range
    return ((x1 <= x2 && y1 >= y2) || (x1 >= x2 && y1 <= y2)) 
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const ranges = [...input.matchAll(/(?<x1>\d{1,2})-(?<y1>\d{1,2}),(?<x2>\d{1,2})-(?<y2>\d{1,2})/g)];
  return ranges.reduce((overlappingRanges, range) => {
    const isOverlapping = compareRanges(range.groups)
    return overlappingRanges + +isOverlapping;
  }, 0)
  function compareRanges(range) {
    const { x1, x2, y1, y2 } = range
    return ((x1 >= x2 && x1 <= y2) || (x2 >= x1 && x2 <= y1))
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
