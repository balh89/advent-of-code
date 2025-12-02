import run from "aocrunner";

const tokensCost = {
  A: 3,
  B: 1,
};
const part1 = (rawInput) => {
  const games = parseInput(rawInput);

  return games.reduce((tokens, game) => {
    const { buttonA, buttonB, price } = game;
    const { A, B } = solveLinearEquations(
      buttonA.x,
      buttonB.x,
      price.x,
      buttonA.y,
      buttonB.y,
      price.y,
    );

    if (!Number.isInteger(A) || !Number.isInteger(B)) {
      return tokens;
    }

    return tokens + A * tokensCost.A + B * tokensCost.B;
  }, 0);

  function parseInput(rawInput) {
    return rawInput
      .split(/\n\n/)
      .map((game) => game.split(/\n/))
      .map(([rawButtonA, rawButtonB, rawPrice]) => {
        const buttonAMatch = rawButtonA.match(/X\+(\d+),\sY\+(\d+)/);
        const buttonBMatch = rawButtonB.match(/X\+(\d+),\sY\+(\d+)/);
        const priceMatch = rawPrice.match(/X\=(\d+),\sY\=(\d+)/);
        const buttonA = { x: buttonAMatch[1], y: buttonAMatch[2] };
        const buttonB = { x: buttonBMatch[1], y: buttonBMatch[2] };
        const price = { x: priceMatch[1], y: priceMatch[2] };

        return { buttonA, buttonB, price };
      });
  }
};

const part2 = (rawInput) => {
  const games = parseInput(rawInput);

  return games.reduce((tokens, game) => {
    const { buttonA, buttonB, price } = game;
    const { A, B } = solveLinearEquations(
      buttonA.x,
      buttonB.x,
      price.x,
      buttonA.y,
      buttonB.y,
      price.y,
    );

    if (!Number.isInteger(A) || !Number.isInteger(B)) {
      return tokens;
    }

    return tokens + A * tokensCost.A + B * tokensCost.B;
  }, 0);

  function parseInput(rawInput) {
    return rawInput
      .split(/\n\n/)
      .map((game) => game.split(/\n/))
      .map(([rawButtonA, rawButtonB, rawPrice]) => {
        const buttonAMatch = rawButtonA.match(/X\+(\d+),\sY\+(\d+)/);
        const buttonBMatch = rawButtonB.match(/X\+(\d+),\sY\+(\d+)/);
        const priceMatch = rawPrice.match(/X\=(\d+),\sY\=(\d+)/);
        const buttonA = { x: buttonAMatch[1], y: buttonAMatch[2] };
        const buttonB = { x: buttonBMatch[1], y: buttonBMatch[2] };
        const price = {
          x: 10000000000000 + +priceMatch[1],
          y: 10000000000000 + +priceMatch[2],
        };

        return { buttonA, buttonB, price };
      });
  }
};

function solveLinearEquations(a, b, c, d, e, f) {
  const determinant = a * e - b * d;

  if (determinant === 0) {
    if (a * f - c * d === 0 && b * f - c * e === 0) {
      return "Infinite solutions";
    }
    return "No solution";
  }
  const A = (c * e - b * f) / determinant;
  const B = (a * f - c * d) / determinant;

  return {
    A: Number(A.toFixed(4)),
    B: Number(B.toFixed(4)),
  };
}

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
