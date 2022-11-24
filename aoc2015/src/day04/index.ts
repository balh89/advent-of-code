import run from "aocrunner";
import crypto from "crypto";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getMd5HashWithXZeroes(input, 5);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getMd5HashWithXZeroes(input, 6);
};

function getMd5HashWithXZeroes(input: string, zeroCount: number) {
  let index = 0;
  let md5 = "";
  while (md5.slice(0, zeroCount) !== "0".repeat(zeroCount)) {
    index++;
    md5 = crypto
      .createHash("md5")
      .update(input + index)
      .digest("hex");
  }
  return index;
}
run({
  part1: {
    tests: [
      {
        input: `abcdef`,
        expected: 609043,
      },
      {
        input: "iwrupvqb",
        expected: 346386,
      },
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
