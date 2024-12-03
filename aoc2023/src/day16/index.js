import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = createMatrix(input);
  const energized = traverseContraption(0, 0, matrix)
  return [...new Set(Object.keys(energized).map(x => {
    const i = x.indexOf("-");
    return x.slice(0, i)
  }))].length;

  function traverseContraption(x, y, matrix, direction = "right", energized = {}) {
    if (energized[[`y:${y}x:${x}-${direction}`]]) {
      return energized;
    }
    const cellValue = matrix[y] && matrix[y][x];
    if (cellValue) {
      energized[`y:${y}x:${x}-${direction}`] = true;
    } else {
      return energized;
    }
    switch(cellValue) {
      case ".": {
        if (direction === "right") {
          return traverseContraption(x + 1, y, matrix, direction, energized);
        } else if (direction === "left") {
          return traverseContraption(x - 1, y, matrix, direction, energized);
        } else if (direction === "down") {
          return traverseContraption(x, y + 1, matrix, direction, energized);
        } else if (direction === "up") {
          return traverseContraption(x, y - 1, matrix, direction, energized);
        }
      }
      case "/": {
        if (direction === "right") {
          return traverseContraption(x, y - 1, matrix, "up", energized);
        } else if (direction === "left") {
          return traverseContraption(x, y + 1, matrix, "down", energized);
        } else if (direction === "down") {
          return traverseContraption(x - 1, y, matrix, "left", energized);
        } else if (direction === "up") {
          return traverseContraption(x + 1, y, matrix, "right", energized);
        }
      }
      case "\\": {
        if (direction === "right") {
          return traverseContraption(x, y + 1, matrix, "down", energized);
        } else if (direction === "left") {
          return traverseContraption(x, y - 1, matrix, "up", energized);
        } else if (direction === "down") {
          return traverseContraption(x + 1, y, matrix, "right", energized);
        } else if (direction === "up") {
          return traverseContraption(x - 1, y, matrix, "left", energized);
        }
      }
      case "|": {
        if (direction === "right") {
          traverseContraption(x, y - 1, matrix, "up", energized);
          traverseContraption(x, y + 1, matrix, "down", energized);
          return energized;
        } else if (direction === "left") {
          traverseContraption(x, y - 1, matrix, "up", energized);
          traverseContraption(x, y + 1, matrix, "down", energized);
          return energized;
        } else if (direction === "down") {
          return traverseContraption(x, y + 1, matrix, direction, energized);
        } else if (direction === "up") {
          return traverseContraption(x, y - 1, matrix, direction, energized);
        }
      }
      case "-": {
        if (direction === "right") {
          return traverseContraption(x + 1, y, matrix, "right", energized);
        } else if (direction === "left") {
          return traverseContraption(x - 1, y, matrix, "left", energized);
        } else if (direction === "down") {
          traverseContraption(x - 1, y, matrix, "left", energized);
          traverseContraption(x + 1, y, matrix, "right", energized);
          return energized;
        } else if (direction === "up") {
          traverseContraption(x - 1, y, matrix, "left", energized);
          traverseContraption(x + 1, y, matrix, "right", energized);
          return energized;
        }
      }
    }
  }
};

function createMatrix(input) {
  const matrix = []
  for (let i = 0; i < input.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      const value = input[i][j];
      matrix[i][j] = value;
    }
  }
  return matrix ;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = createMatrix(input);
  const startPositions = getStartPositions(matrix);
  return startPositions.reduce((largestEnergized, startPosition) => {
    const energized = traverseContraption(startPosition.x, startPosition.y, matrix, startPosition.direction)
    const energizedSum = [...new Set(Object.keys(energized).map(x => {
      const i = x.indexOf("-");
      return x.slice(0, i)
    }))].length;
    if (energizedSum > largestEnergized) {
      largestEnergized = energizedSum;
    }
    return largestEnergized;
  }, 0)


  function getStartPositions(matrix) {
    const fromTop = matrix[0].map((x, index) => {
      return { y: 0, x: index, direction: "down" };
    })
    const fromBottom = matrix[matrix.length - 1].map((x, index) => {
      return { y: matrix.length - 1, x: index, direction: "up" };
    })
    const fromLeft = matrix.map((x, index) => {
      return { y: index, x: 0, direction: "right" };
    })
    const fromRight = matrix.map((x, index) => {
      return { y: index, x: matrix[0].length - 1, direction: "left" };
    })
    return [...fromTop, ...fromBottom, ...fromLeft, ...fromRight];
  }

  function traverseContraption(x, y, matrix, direction = "right", energized = {}) {
    if (energized[[`y:${y}x:${x}-${direction}`]]) {
      return energized;
    }
    const cellValue = matrix[y] && matrix[y][x];
    if (cellValue) {
      energized[`y:${y}x:${x}-${direction}`] = true;
    } else {
      return energized;
    }
    switch(cellValue) {
      case ".": {
        if (direction === "right") {
          return traverseContraption(x + 1, y, matrix, direction, energized);
        } else if (direction === "left") {
          return traverseContraption(x - 1, y, matrix, direction, energized);
        } else if (direction === "down") {
          return traverseContraption(x, y + 1, matrix, direction, energized);
        } else if (direction === "up") {
          return traverseContraption(x, y - 1, matrix, direction, energized);
        }
      }
      case "/": {
        if (direction === "right") {
          return traverseContraption(x, y - 1, matrix, "up", energized);
        } else if (direction === "left") {
          return traverseContraption(x, y + 1, matrix, "down", energized);
        } else if (direction === "down") {
          return traverseContraption(x - 1, y, matrix, "left", energized);
        } else if (direction === "up") {
          return traverseContraption(x + 1, y, matrix, "right", energized);
        }
      }
      case "\\": {
        if (direction === "right") {
          return traverseContraption(x, y + 1, matrix, "down", energized);
        } else if (direction === "left") {
          return traverseContraption(x, y - 1, matrix, "up", energized);
        } else if (direction === "down") {
          return traverseContraption(x + 1, y, matrix, "right", energized);
        } else if (direction === "up") {
          return traverseContraption(x - 1, y, matrix, "left", energized);
        }
      }
      case "|": {
        if (direction === "right") {
          traverseContraption(x, y - 1, matrix, "up", energized);
          traverseContraption(x, y + 1, matrix, "down", energized);
          return energized;
        } else if (direction === "left") {
          traverseContraption(x, y - 1, matrix, "up", energized);
          traverseContraption(x, y + 1, matrix, "down", energized);
          return energized;
        } else if (direction === "down") {
          return traverseContraption(x, y + 1, matrix, direction, energized);
        } else if (direction === "up") {
          return traverseContraption(x, y - 1, matrix, direction, energized);
        }
      }
      case "-": {
        if (direction === "right") {
          return traverseContraption(x + 1, y, matrix, "right", energized);
        } else if (direction === "left") {
          return traverseContraption(x - 1, y, matrix, "left", energized);
        } else if (direction === "down") {
          traverseContraption(x - 1, y, matrix, "left", energized);
          traverseContraption(x + 1, y, matrix, "right", energized);
          return energized;
        } else if (direction === "up") {
          traverseContraption(x - 1, y, matrix, "left", energized);
          traverseContraption(x + 1, y, matrix, "right", energized);
          return energized;
        }
      }
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        .|...\\....
        |.-.\\.....
        .....|-...
        ........|.
        ..........
        .........\\
        ..../.\\\\..
        .-.-/..|..
        .|....-|.\\
        ..//.|....
        `,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        .|...\\....
        |.-.\\.....
        .....|-...
        ........|.
        ..........
        .........\\
        ..../.\\\\..
        .-.-/..|..
        .|....-|.\\
        ..//.|....
        `,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
