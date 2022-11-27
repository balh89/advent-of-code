import run from "aocrunner";
import { Blob } from "node:buffer";
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { literalCount, memoryCount } = input.split("\n").reduce(
    (acc, string) => {
      acc.literalCount += string.length;
      acc.memoryCount += eval(string).length;
      return acc;
    },
    { literalCount: 0, memoryCount: 0 },
  );

  return literalCount - memoryCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { literalCount, memoryCount } = input.split("\n").reduce(
    (acc, string) => {
      const encodedString = JSON.stringify(string);
      acc.literalCount += encodedString.length;
      acc.memoryCount += eval(encodedString).length;
      return acc;
    },
    { literalCount: 0, memoryCount: 0 },
  );

  return literalCount - memoryCount;
};

run({
  part1: {
    tests: [],
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
