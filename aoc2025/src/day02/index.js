import run from "aocrunner";
function parseInput(rawInput) {
  return rawInput
  .split(",")
  .map((range) => range
    .split("-")
    .map(Number));
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return checkRangesForInvalidIds(input);

  function checkRangesForInvalidIds(ranges) {
    return ranges.reduce((invalidIdSum, [start, end]) => {
      for (let i = start; i <= end; i++) {
        const idString = i.toString();
        if (idString.length % 2 === 0) {
          if (idString.slice(0, idString.length / 2) === idString.slice(idString.length / 2)) {
            invalidIdSum += i
          }
        }
      }
      return invalidIdSum;
    }, 0)
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return checkRangesForInvalidIds(input);

  function checkRangesForInvalidIds(ranges) {
    const regex = /^(.+)\1+$/
    return ranges.reduce((invalidIdSum, [start, end]) => {
      for (let i = start; i <= end; i++) {
        if (regex.test(i)) {
          invalidIdSum += i
        }
      }
      return invalidIdSum;
    }, 0)
  }
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
