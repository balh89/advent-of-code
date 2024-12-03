import run from "aocrunner";
import { create } from "domain";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = createMatrix(input);
  const transposedMatrix = transpose(matrix);
  const tiltedNorthMatrix = tiltNorth(transposedMatrix);
  const reversedTiltedNorthMatrix = tiltedNorthMatrix.map(row => row.reverse());
  return calculateTotalLoadOnSupportBeams(reversedTiltedNorthMatrix);
};

function calculateTotalLoadOnSupportBeams(matrix) {
  return matrix.reduce((totalLoad, row) => {
    row.forEach((value, index) => {
      if (value === "O") {
        totalLoad += (index + 1);
      }
    })
    return totalLoad;
  }, 0)
}

function tiltNorth(matrix) {
  return matrix.reduce((acc, row) => {
    const tiltedRow = row.reduce((rowAcc, value, rowIndex) => {
      if (value === "O") {
        rowAcc.rowArray.push(value);
      } else if (value === "#") {
        rowAcc.rowArray.push(...rowAcc.dotArray)
        rowAcc.rowArray.push(value);
        rowAcc.dotArray = [];
      } else if (value === ".") {
        rowAcc.dotArray.push(value);
      }

      if (rowIndex === row.length - 1) {
        rowAcc.rowArray.push(...rowAcc.dotArray)
      }
      return rowAcc;
    }, { rowArray: [], dotArray: [] })
    acc.push(tiltedRow.rowArray);
    return acc;
  }, [])
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

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

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 136,
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
