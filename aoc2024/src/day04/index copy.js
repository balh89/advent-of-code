import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const directions = [
  [0, 1], // right
  [1, 1], // right down
  [1, 0], // down
  [1, -1], // left down
  [0, -1], // left
  [-1, -1], // left up
  [-1, 0], // up
  [-1, 1], // rightU up
];

const word = "XMAS";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = create2dArray(input);

  return checkGrid(grid);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

function checkGrid(grid) {
  return grid.reduce(
    (totalSum, row, rowIndex) => checkRow(totalSum, row, rowIndex, grid),
    0,
  );
}

function checkRow(totalSum, row, rowIndex) {
  return (
    totalSum +
    row.reduce(
      (wordsFromRow, cell, cellIndex) =>
        checkCell(wordsFromRow, cell, cellIndex, rowIndex),
      0,
    )
  );
}

function checkCell(wordsFromRow, cell, cellIndex, rowIndex, grid) {
  if (cell !== word[0]) {
    return wordsFromRow;
  }

  return (
    wordsFromRow +
    directions.reduce((wordsFromCell, direction) => {
      const hasWordInDirection = checkDirection(
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
}

function create2dArray(input) {
  return input.split(/\n/).map((x) => x.split(""));
}

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
