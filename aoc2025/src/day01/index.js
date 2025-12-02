import run from "aocrunner";

function parseInput(rawInput) {
  return rawInput
  .split("\n")
  .map((row) => {
    const direction = row[0];
    const digit = +row.slice(1)

    return { direction, digit }
  });
}

const RIGHT = "R";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { zeroCount } = performRotations(input);

  return zeroCount
};

function performRotations(rotations) {
  return rotations.reduce((acc, { direction, digit }) => {
    acc.count += direction === RIGHT ? digit : -digit;
    acc.count = acc.count % 100

    if (acc.count === 0) {
      acc.zeroCount++;
    }

    return acc;
  }, { count: 50, zeroCount: 0 })
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 3,
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
