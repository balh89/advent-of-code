import run from "aocrunner";

const part1 = (rawInput) => {
  let input = parseInput(rawInput);

  for (let i = 0; i < 25; i++) {
    input = Object.keys(input).reduce((acc, key) => {
      processStone(+key, acc, input);
      return acc;
    }, {});
  }

  return Object.values(input).reduce((sum, stone) => {
    return sum + stone.count;
  }, 0);
};

const part2 = (rawInput) => {
  let input = parseInput(rawInput);

  for (let i = 0; i < 75; i++) {
    input = Object.keys(input).reduce((acc, key) => {
      processStone(+key, acc, input);
      return acc;
    }, {});
  }

  return Object.values(input).reduce((sum, stone) => {
    return sum + stone.count;
  }, 0);
};

function processStone(stone, acc, input) {
  const stoneNumberLength = stone.toString().length;
  if (stone === 0) {
    acc[1] = acc[1] || { count: 0 };
    acc[1].count += input[stone].count;
  } else if (stoneNumberLength % 2 === 0) {
    const first = +stone.toString().slice(0, stoneNumberLength / 2);
    const second = +stone
      .toString()
      .slice(stoneNumberLength / 2, stoneNumberLength);
    acc[first] = acc[first] || { count: 0 };
    acc[first].count += input[stone].count;
    acc[second] = acc[second] || { count: 0 };
    acc[second].count += input[stone].count;
  } else {
    acc[stone * 2024] = acc[stone * 2024] || {
      count: 0,
    };
    acc[stone * 2024].count += input[stone].count;
  }
}

function parseInput(rawInput) {
  return rawInput.split(/\s/).reduce((stones, stoneNumber) => {
    stones[+stoneNumber] = {
      count: 1,
    };

    return stones;
  }, {});
}

run({
  part1: {
    tests: [
      {
        input: "125 17",
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "125 17",
        expected: 55312,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
