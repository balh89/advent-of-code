import run from "aocrunner";
import fs from "fs";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  return parseInput(rawInput)
    .split("\n")
    .reduce((calibrationSum, line) => {
      const digits = line
        .split("")
        .map(Number)
        .filter(Boolean)
        .map(String)

      return calibrationSum += +(digits[0] + digits[digits.length - 1]);
    }, 0);
};

const part2 = (rawInput) => {
  const numberMap = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
  }
  const input = parseInput(rawInput).split("\n");
  return input.reduce((acc, line) => {
    const firstDigit = findFirstDigit(line);
    const lastDigit = findLastDigit(line);
    acc += +(firstDigit + lastDigit)
    return acc;
  }, 0)

  function findFirstDigit(line) {
    const wordMatch = Object.keys(numberMap).reduce((acc, word) => {
      const index = line.indexOf(word);
      if (index !== -1 && index < acc.index) {
        acc.index = index;
        acc.word = "" +numberMap[word];
      }
      return acc;
    }, { index: 999, word: "" })
  let index;
  let finalChar;
    for (let char of line) {
      char = char.trim();
      if (!isNaN(+char) && char !== "" && typeof +char === "number") {
        index = line.indexOf(char, index + 1);
        finalChar = char;
        break;
       }
     }
     return index < wordMatch.index ? finalChar : wordMatch.word;
  }

  function findLastDigit(line) {
    const wordMatch = Object.keys(numberMap).reduce((acc, word) => {
      const index = line.lastIndexOf(word);
      if (index !== -1 && index > acc.index) {
        acc.index = index;
        acc.word = "" +numberMap[word];
      }
      return acc;
    }, { index: -1, word: "" })

  let finalIndex;
  let finalChar;
  line.split("").forEach((char, index) => {
     if (!isNaN(+char) && typeof +char === "number") {
      finalIndex = index;
      finalChar = char;
      }
  })
     return finalIndex > wordMatch.index ? finalChar : wordMatch.word;
  }
};

run({
  part1: {
    tests: [
      // {
      //   input: `1abc2
      //   pqr3stu8vwx
      //   a1b2c3d4e5f
      //   treb7uchet`,
      //   expected: 142,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: "8five9ttqst2one2vz",
      //   expected: 82
      // }
      // {
      //   input: `1abc2
      //   pqr3stu8vwx
      //   a1b2c3d4e5f
      //   treb7uchet`,
      //   expected: 142,
      // },
      // {
      //   input: "827",
      //   expected: 87
      // },
      // {
      //   input: "six6fiverqdlm67hztn2five",
      //   expected: 65
      // },
      // {
      //   input: "43eightnvdrthree1eightoneggrdmnp\npffldcmnlpsevensixqxhdncrclbc51five\n5bqnlphone6\n195one",
      //   expected: 183
      // },
      // {
      //   input: "one",
      //   expected: 11
      // },
      // {
      //   input: "xtwone3four",
      //   expected: 24
      // },
      // {
      //   input: "eight9nfgtsjxnteight8pfpfctjxxbffxsmjtwonegcd",
      //   expected: 81
      // },
      // {
      //   input: "zh8",
      //   expected: 88
      // },
      // {
      //   input: `two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen`,
      //   expected: 281
      // },
      //  {
      //    input:
      //    "four3two843nlxxhktmcdoneightjh\ntwo1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen",
      //    expected: 329,
      //  }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
