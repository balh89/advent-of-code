import run from "aocrunner";

const PAPER_ROLL = "@"
const EMPTY = "."

function parseInput(rawInput) {
    return rawInput.split(/\n/)
      .map(x => x.split(""))
}
const part1 = (rawInput) => {
   return getRollsOfPaper(parseInput(rawInput))

    function getRollsOfPaper(input) {
      return input.reduce((accessibleRollsOfPaper, row, rowIndex) => {
        accessibleRollsOfPaper += row.reduce((accessibleRollsOfPaperInRow, cell, cellIndex) => {
          if (cell === EMPTY) {
            return accessibleRollsOfPaperInRow
          }

          accessibleRollsOfPaperInRow += canBeAccessedByForklift(input, rowIndex, cellIndex);

          return accessibleRollsOfPaperInRow;
        }, 0);

        return accessibleRollsOfPaper
      }, 0);
    }


    function canBeAccessedByForklift(matrix, y, x) {
      const neighbours = [
        { y: y - 1, x },
        { y: y - 1, x: x + 1 },
        { y, x: x + 1 },
        { y: y + 1, x: x + 1 },
        { y: y + 1, x },
        { y: y + 1, x: x - 1 },
        { y, x: x - 1 },
        { y: y - 1, x: x - 1 }
      ];
      
      const adjacentRollsOfPaper = neighbours.reduce((adjacentRollsOfPaper, neighbour) => {
        if (adjacentRollsOfPaper > 3) {
          return adjacentRollsOfPaper;
        }
        if (getNeighbour(matrix, neighbour.y, neighbour.x) === PAPER_ROLL) {
          adjacentRollsOfPaper++;
        }

        return adjacentRollsOfPaper;
      }, 0)

      return adjacentRollsOfPaper <= 3;
    }

    function getNeighbour(matrix, y , x) {
      if (matrix[y]) {
        if (matrix[y][x] !== undefined) {
          return matrix[y][x];
        }
      }
      return null;
    }
};

const part2 = (rawInput) => {
   return getRollsOfPaper(parseInput(rawInput))

    function getRollsOfPaper(input) {
      let hasAccessibleRollsOfPaper
      let totalCount = 0;
      
      do {
        const { accessibleRollsPaper, count } = input.reduce((acc, row, rowIndex) => {
          const accessibleRollsOfPaperInRow = row.reduce((accessibleRollsOfPaperInRow, cell, cellIndex) => {
            if (cell === EMPTY) {
              return accessibleRollsOfPaperInRow
            }
            const canBeAccessedByForklift = getCanBeAccessedByForklift(input, rowIndex, cellIndex);
            if (canBeAccessedByForklift) {
              accessibleRollsOfPaperInRow.push({ y: rowIndex, x: cellIndex })
            }

            return accessibleRollsOfPaperInRow;
          }, []);

          acc.count += accessibleRollsOfPaperInRow.length;
          acc.accessibleRollsPaper.push(...accessibleRollsOfPaperInRow)

          return acc
        }, { accessibleRollsPaper: [], count: 0 });


        hasAccessibleRollsOfPaper = count > 0;
        totalCount += count;
        input = removeRollsOfPaperFromInput(input, accessibleRollsPaper)
      } while (hasAccessibleRollsOfPaper)

        return totalCount;
    }

    function removeRollsOfPaperFromInput(input, accessibleRollsPaper) {
      accessibleRollsPaper.forEach(({ y, x }) => {
        input[y][x] = ".";
      })

      return input;
    }


    function getCanBeAccessedByForklift(matrix, y, x) {
      const neighbours = [
        { y: y - 1, x },
        { y: y - 1, x: x + 1 },
        { y, x: x + 1 },
        { y: y + 1, x: x + 1 },
        { y: y + 1, x },
        { y: y + 1, x: x - 1 },
        { y, x: x - 1 },
        { y: y - 1, x: x - 1 }
      ];
      
      const adjacentRollsOfPaper = neighbours.reduce((adjacentRollsOfPaper, neighbour) => {
        if (adjacentRollsOfPaper > 3) {
          return adjacentRollsOfPaper;
        }
        if (getNeighbour(matrix, neighbour.y, neighbour.x) === PAPER_ROLL) {
          adjacentRollsOfPaper++;
        }

        return adjacentRollsOfPaper;
      }, 0)

      return adjacentRollsOfPaper <= 3;
    }

    function getNeighbour(matrix, y , x) {
      if (matrix[y]) {
        if (matrix[y][x] !== undefined) {
          return matrix[y][x];
        }
      }
      return null;
    }
};

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 13,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 43,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
