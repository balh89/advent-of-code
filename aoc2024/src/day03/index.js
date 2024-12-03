import run from "aocrunner";

const part1 = (rawInput) => {
  const parsedInput = [...rawInput.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)/g)];
  return parsedInput.reduce((sum, match) => sum + +match[1] * +match[2], 0);
};

const part2 = (rawInput) => {
  const filteredInput = rawInput.replaceAll(/don't\(\).+?(do\(\)|$)/g, "");
  const parsedInput = [
    ...filteredInput.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)/g),
  ];
  return parsedInput.reduce((sum, match) => sum + +match[1] * +match[2], 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
