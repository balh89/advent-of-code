import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = createMatrix(input);
  const visibleTrees = findVisibleTrees(matrix);
  return Object.keys(visibleTrees).length;

  function findVisibleTrees(matrix, visibleTrees = {}) {
    let highestTreeLeft;
    let highestTreeRight;
    let highestTreeUp;
    let highestTreeDown;
    for (let i = 0;i<matrix.length;i++) {
      const row = matrix[i];
      highestTreeLeft = -1;
      highestTreeRight = -1;
      highestTreeDown = -1;
      highestTreeUp = -1;
  
      for (let j = 0;j<row.length;j++) {
        //left
        let cell = row[j];
        if (cell > highestTreeLeft) {
          highestTreeLeft = cell;
          visibleTrees[`row:${i}col:${j}`] = true;
        }
        //right
        cell = row[row.length - 1 - j];
        if (cell > highestTreeRight) {
          highestTreeRight = cell;
          visibleTrees[`row:${i}col:${row.length - 1 - j}`] = true;
        }
  
        //up
        cell = matrix[j][i];
        if (cell > highestTreeUp) {
          highestTreeUp = cell;
          visibleTrees[`row:${j}col:${i}`] = true;
        }
  
        //down
        cell = matrix[matrix.length - 1 - j][i];
        if (cell > highestTreeDown) {
          highestTreeDown = cell;
          visibleTrees[`row:${matrix.length - 1 - j}col:${i}`] = true;
        }
      }
    }
    return visibleTrees;
  };
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = createMatrix(input);
  const scenicScores = findScenicScores(matrix);
  return Object.values(scenicScores).sort((a, b) => b - a)[0];

  function findScenicScores(matrix, scenicScores = {}) {
    let cell;
    let originalCell;
    let measureIndex;
    for (let rowIndex = 0;rowIndex<matrix.length;rowIndex++) {
      const row = matrix[rowIndex];
      for (let colIndex = 0;colIndex<row.length;colIndex++) {
        originalCell = row[colIndex];
        let left = 0;
        let right = 0;
        let down = 0;
        let up = 0;

        //left
        measureIndex = colIndex - 1 ;
        while (measureIndex >= 0) {
          cell = row[measureIndex];
          measureIndex--;
          if (cell <= originalCell) {
            left++;
          }
          if (cell >= originalCell) {
            break;
          }
        }

        //right
        measureIndex = colIndex + 1;
        while (measureIndex < row.length) {
          cell = row[measureIndex];
          measureIndex++;
          if (cell <= originalCell) {
            right++;
          }
          if (cell >= originalCell) {
            break;
          }
        }

        //down
        measureIndex = rowIndex + 1;
        while (measureIndex < matrix.length) {
          cell = matrix[measureIndex][colIndex];
          measureIndex++;
          if (cell <= originalCell) {
            down++;
          }
          if (cell >= originalCell) {
            break;
          }
        }
  
        //up
        measureIndex = rowIndex - 1;
        while (measureIndex >= 0) {
          cell = matrix[measureIndex][colIndex];
          measureIndex--;
          if (cell <= originalCell) {
            up++;
          }
          if (cell >= originalCell) {
            break;
          }
        }
        scenicScores[`row:${rowIndex}col:${colIndex}`] = left * right * up * down;
      }
    }
    return scenicScores;
  };

};

function createMatrix(input) {
  return input.split(/\n/).map(row => row.split("").map(cell => +cell));
}


run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 21,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 4,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
