import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const directionsPart1 = [
  [0, 1], // right
  [1, 1], // right down
  [1, 0], // down
  [1, -1], // left down
  [0, -1], // left
  [-1, -1], // left up
  [-1, 0], // up
  [-1, 1], // right up
];

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = create2dArray(input);
  const word = "XMAS";

  return checkGrid(grid, checkDirection, word);

  function checkDirection(row, col, grid, direction) {
    const [x, y] = direction;

    for (let i = 0; i < word.length; i++) {
      const currentRow = row + i * x;
      const currentCol = col + i * y;

      if (grid?.[currentRow]?.[currentCol] !== word[i]) {
        return false;
      }
    }

    return true;
  }

  function checkGrid(grid, directionCheck, word) {
    return grid.reduce((totalSum, row, rowIndex) => {
      return (
        totalSum +
        row.reduce((wordsFromRow, cell, cellIndex) => {
          if (cell !== word[0]) {
            return wordsFromRow;
          }

          return (
            wordsFromRow +
            directionsPart1.reduce((wordsFromCell, direction) => {
              const hasWordInDirection = directionCheck(
                rowIndex,
                cellIndex,
                grid,
                direction,
              );
              if (hasWordInDirection) {
                return wordsFromCell + 1;
              }

              return wordsFromCell;
            }, 0)
          );
        }, 0)
      );
    }, 0);
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = create2dArray(input);
  const word = "A";

  return checkGrid(grid, checkForX_MAS, word);

  function checkForX_MAS(row, col, grid) {
    const leftUp = grid?.[row - 1]?.[col - 1];
    const leftDown = grid?.[row + 1]?.[col - 1];
    const rightUp = grid?.[row - 1]?.[col + 1];
    const rightDown = grid?.[row + 1]?.[col + 1];

    return (
      ((leftUp === "M" && rightDown === "S") ||
        (leftUp === "S" && rightDown === "M")) &&
      ((leftDown === "M" && rightUp === "S") ||
        (leftDown === "S" && rightUp === "M"))
    );
  }

  function checkGrid(grid, directionCheck, word) {
    return grid.reduce((totalSum, row, rowIndex) => {
      return (
        totalSum +
        row.reduce((wordsFromRow, cell, cellIndex) => {
          if (cell !== word[0]) {
            return wordsFromRow;
          }

          const hasWordInDirection = directionCheck(rowIndex, cellIndex, grid);
          if (hasWordInDirection) {
            return wordsFromRow + 1;
          }

          return wordsFromRow;
        }, 0)
      );
    }, 0);
  }
};

function create2dArray(input) {
  return input.split(/\n/).map((x) => x.split(""));
}

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
