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
  const { zeroCount } = performRotations0x434C49434B(input);

  return zeroCount
};

function performRotations0x434C49434B(rotations) {
  return rotations.reduce((acc, { direction, digit }) => {
    for (let i = 1;i <= digit; i++) {
          acc.count += direction === RIGHT ? 1 : -1;
          if (acc.count === 0) {
            acc.zeroCount++;
          } else if (acc.count === -1) {
            acc.count = 99;
          } else if (acc.count === 100) {
            acc.count = 0;
            acc.zeroCount++;
          }
    }

    return acc;
  }, { count: 50, zeroCount: 0 })
}

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
        expected: 6,
}
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
