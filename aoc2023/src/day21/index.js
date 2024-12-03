import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\n/);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { matrix, startPosition } = createMatrix(input);
  const positions = traverseGarden(matrix, startPosition);
  return positions.length;
};

function traverseGarden(matrix, startPosition) {
  let currentPositions = [startPosition];
  for (let i = 0; i < 64; i++) {
    const newCurrentPositions = currentPositions
      .flatMap(position => getNextPositions(position, matrix))
      currentPositions = newCurrentPositions.filter((obj, index) => newCurrentPositions.findIndex((item) => (item.x === obj.x && item.y === obj.y)) === index)

  }
  return currentPositions;
}

function createMatrix(input) {
  const matrix = [];
  const startPosition = {};
  for (let i = 0; i < input.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      const value = input[i][j];
      if (value === "S") {
        startPosition.y = i;
        startPosition.x = j;
      }
      matrix[i][j] = value;
    }
  }
  return { matrix, startPosition };
}

function getNextPositions({ x, y }, matrix) {
  const legalValues = [".", "S"];
  const left = { x: x - 1, y };
  const right = {x: x + 1, y };
  const down = { x, y: y + 1 };
  const up = { x, y: y - 1 }

  return [left, right, up, down]
    .filter(({ x, y }) => { 
      const xBigger = x >= 0;
      const xLesser = x <= matrix[0].length;
      const yBigger = y >= 0;
      const yLesser = y <= matrix.length - 1;
      return xBigger && xLesser && yBigger && yLesser && legalValues.includes(matrix[y][x]);
    });
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        ...........
        .....###.#.
        .###.##..#.
        ..#.#...#..
        ....#.#....
        .##..S####.
        .##..#...#.
        .......##..
        .##.#.####.
        .##..##.##.
        ...........
        `,
        expected: 16,
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
