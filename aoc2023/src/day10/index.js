import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");


const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { startPosition, matrix } = createMatrix(input);
  const count = traversePipe(startPosition, matrix);
  return Math.ceil(count / 2);
};

// function traversePipe(position, matrix, previousPosition = { x: -1, y: -1 }, count = 0) {
//   const nextPosition = getNextPosition(position, matrix, previousPosition)
//   const value = matrix[nextPosition.y][nextPosition.x];
//   count++;
//   if (value !== "S") {
//     return traversePipe(nextPosition, matrix, position, count);
//   }

//   return count;
// }

function traversePipe(startPosition, matrix) {
  let position = startPosition;
  let previousPosition = { x: -1, y: -1 };
  let count = 0;

  while (matrix[position.y][position.x] !== "S" || count === 0) {
    let nextPosition = getNextPosition(position, matrix, previousPosition);
    previousPosition = position;
    position = nextPosition;
    count++;
  }

  return count;
}

function getNextPosition({ x, y }, matrix, previousPosition) {
  const left = { name: "left", x: x - 1, y, legalPipes: ["-", "L", "F"] };
  const right = { name: "right", x: x + 1, y, legalPipes: ["-", "J", "7"] };
  const down = { name: "down", x, y: y + 1, legalPipes: ["|", "L", "J"] };
  const up = { name: "up", x, y: y - 1, legalPipes: ["|", "7", "F"] }

  const legalPositionFromCurrent = getLegalPositionFromCurrent(matrix[y][x]);
  const legalPositions = [left, right, up, down]
    .filter(({ x, y, name }) => { 
      const xBigger = x >= 0;
      const xLesser = x <= matrix[0].length;
      const yBigger = y >= 0;
      const yLesser = y <= matrix.length - 1;
      return xBigger && xLesser && yBigger && yLesser && legalPositionFromCurrent.includes(name);
    });

    const foo = legalPositions.find(position => {
      if (isPreviousPosition(position, previousPosition)) {
        return false;
      }

      const value = matrix[position.y][position.x];
      if (value === "S" || position.legalPipes.includes(value)) {
        return true;
      }
    })
    return foo;
}


function getLegalPositionFromCurrent(value) {
  switch(value) {
    case "|": {
      return ["up", "down"];
    }
    case "-": {
      return ["left", "right"];
    }
    case "L": {
      return ["up", "right"];
    }
    case "S":
    case "J": {
      return ["up", "left"];
    }
    case "7": {
      return ["down", "left"];
    }
    case "F": {
      return ["down", "right"];
    }
  }
}

function isPreviousPosition(position, previousPosition) {
  return position.x === previousPosition.x && position.y === previousPosition.y;
}

function createMatrix(input) {
  const matrix = []
  const startPosition = {};
  for (let i = 0; i < input.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      const value = input[i][j];
      if (value === "S") {
        startPosition.x = j;
        startPosition.y = i;
      }
      matrix[i][j] = value;
    }
  }
  return { startPosition, matrix };
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   .....
      //   .S-7.
      //   .|.|.
      //   .L-J.
      //   .....
      //   `,
      //   expected: 4,
      // },
      // {
      //   input: `
      //   ..F7.
      //   .FJ|.
      //   SJ.L7
      //   |F--J
      //   LJ...
      //   `,
      //   expected: 8,
      // }
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
