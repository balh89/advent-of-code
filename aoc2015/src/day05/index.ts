import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;
const badWords = ["ab", "cd", "pq", "xy"];
const vowels = ["a", "e", "i", "o", "u"];

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const niceWords = input.filter((string) => {
    return (
      vowelCheck(string) && twiceInARowCheck(string) && !badStringCheck(string)
    );
  });
  return niceWords.length;

  function vowelCheck(string: string) {
    return (
      string
        .split("")
        .filter((char: string) => vowels.some((vowel) => vowel === char))
        .length >= 3
    );
  }

  function twiceInARowCheck(string: string) {
    return string.split("").some((char: string, index: number) => {
      return char === string[index + 1];
    });
  }

  function badStringCheck(string: string) {
    return badWords.some((badWord: string) => {
      return string.includes(badWord);
    });
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const niceWords = input.filter((string: string) => {
    const foo = twoPairCheck(string);
    const bar = repeatedLetterWithSpaceCheck(string);
    return twoPairCheck(string) && repeatedLetterWithSpaceCheck(string);
  });

  return niceWords.length;

  function twoPairCheck(string: string) {
    const pairs = Array.from(string.matchAll(/(?=(\w{2}))/g), (x) => x[1]);
    return pairs.some((pair: string, index: number) => {
      return (
        pairs.slice(index + 2).findIndex((p: string, i: number) => {
          return pair === p;
        }) !== -1
      );
    });

    // const pairs = string.match(/(..?)/g) || [];
    // const uniquePairs = [...new Set(pairs)];
    // return pairs.length !== uniquePairs.length;

    // return string.split("").some((char: string, index: number) => {
    //   const pair = char + (string[index + 1] || "");
    //   if (pair.length !== 2) return false;
    //   return (
    //     string.slice(index + 1).includes(pair) &&
    //     string.substr(index, 3) !== char.repeat(3)
    //   );
    // });
  }

  function repeatedLetterWithSpaceCheck(string: string) {
    return string.split("").some((char: string, index: number) => {
      return char === string[index + 2];
    });
  }
};

run({
  part1: {
    tests: [
      {
        input: `ugknbfddgicrmopn`,
        expected: 1,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `aaa`,
        expected: 0,
      },
      {
        input: `qjhvhtzxzqqjkmpb`,
        expected: 1,
      },
      {
        input: "xxyxx",
        expected: 1,
      },
      {
        input: "uurcxstgmygtbstg",
        expected: 0,
      },
      {
        input: "ieodomkazucvgmuy",
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
