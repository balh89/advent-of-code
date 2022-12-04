import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const pairs = input.split(/\n/);
  return pairs.reduce((overlappingRanges, pair) => {
    const [firstRange, secondRange] = pair.split(",");
    const isOverlapping = compareRanges(firstRange, secondRange, compareFunc)
    return overlappingRanges + +isOverlapping;
  }, 0)

  function compareFunc(array, map) {
    return array.every(el => map[el]);
  } 
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const pairs = input.split(/\n/);
  return pairs.reduce((overlappingRanges, pair) => {
    const [firstRange, secondRange] = pair.split(",");
    const isOverlapping = compareRanges(firstRange, secondRange, compareFunc)
    return overlappingRanges + +isOverlapping;
  }, 0)

  function compareFunc(array, map) {
    return array.some(el => map[el]);
  } 
};

function compareRanges(firstRange, secondRange, compareFunc) {
  let isOverlapping = false;
  
  const firstArray = createArray(firstRange)
  const secondArray = createArray(secondRange)
  if (firstArray.length <= secondArray.length) {
    const secondMap = createHashMap(secondArray);
    isOverlapping = compareFunc(firstArray, secondMap);
  }
  if (!isOverlapping) {
    const firstMap = createHashMap(firstArray);
    isOverlapping = compareFunc(secondArray, firstMap);
  }
  return isOverlapping;
}

function createArray(range) {
  const [a, b] = range.split("-").map(section => Number(section));
  return Array.from({length: b - a + 1}, (_, i) => i + a);
}

function createHashMap(array) {
  return array.reduce((acc, el) => {
    acc[el] = true;
    return acc;
  }, {})
}

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
