import run from "aocrunner";

const EMPTY = ".";

const part1 = (rawInput) => {
  const { grid, antennaPositions } =
    createGridAndFindAntennaPositions(rawInput);

  const positionsWithAntiNode = Object.values(antennaPositions).reduce(
    (acc, positions) => {
      const antiNodes = positions.reduce(
        (sum, firstAntenna, firstAntennaIndex) => {
          const antiNodesFromAntennaType = positions.reduce(
            (acc, secondAntenna, secondAntennaIndex) => {
              if (firstAntennaIndex === secondAntennaIndex) {
                return acc;
              }

              const yDiff = secondAntenna.y - firstAntenna.y;
              const xDiff = secondAntenna.x - firstAntenna.x;
              const nodePosition = {};
              nodePosition.x = firstAntenna.x - xDiff;
              nodePosition.y = firstAntenna.y - yDiff;

              if (
                nodePosition.x >= grid[0].length ||
                nodePosition.x < 0 ||
                nodePosition.y >= grid.length ||
                nodePosition.y < 0
              ) {
                return acc;
              }

              acc.push(`y${nodePosition.y}x${nodePosition.x}`);
              return acc;
            },
            [],
          );

          sum.push(...antiNodesFromAntennaType);
          return sum;
        },
        [],
      );
      acc.push(...antiNodes);
      return acc;
    },
    [],
  );

  return [...new Set(positionsWithAntiNode)].length;
};

function createGridAndFindAntennaPositions(input) {
  const antennaPositions = {};
  const grid = input.split(/\n/).map((row, rowIndex) => {
    const splitRow = row.split("");
    splitRow.forEach((cell, cellIndex) => {
      if (cell !== EMPTY) {
        antennaPositions[cell] = antennaPositions[cell] || [];
        antennaPositions[cell].push({ y: rowIndex, x: cellIndex });
      }
    });
    return splitRow;
  });

  return { grid, antennaPositions };
}

const part2 = (rawInput) => {
  const { grid, antennaPositions } =
    createGridAndFindAntennaPositions(rawInput);

  const positionsWithAntiNode = Object.values(antennaPositions).reduce(
    (acc, positions) => {
      const antiNodes = positions.reduce(
        (sum, firstAntenna, firstAntennaIndex) => {
          const antiNodesFromAntennaType = positions.reduce(
            (acc, secondAntenna, secondAntennaIndex) => {
              if (firstAntennaIndex === secondAntennaIndex) {
                return acc;
              }

              let isOutOfBounds = false;
              let y1;
              let x1;
              y1 = firstAntenna.y;
              x1 = firstAntenna.x;
              const yDiff = secondAntenna.y - firstAntenna.y;
              const xDiff = secondAntenna.x - firstAntenna.x;
              const nodePosition = {};
              acc.push(`y${firstAntenna.y}x${firstAntenna.x}`);
              while (!isOutOfBounds) {
                nodePosition.x = x1 - xDiff;
                nodePosition.y = y1 - yDiff;

                if (
                  nodePosition.x >= grid[0].length ||
                  nodePosition.x < 0 ||
                  nodePosition.y >= grid.length ||
                  nodePosition.y < 0
                ) {
                  isOutOfBounds = true;
                } else {
                  acc.push(`y${nodePosition.y}x${nodePosition.x}`);
                  x1 = nodePosition.x;
                  y1 = nodePosition.y;
                }
              }

              return acc;
            },
            [],
          );

          sum.push(...antiNodesFromAntennaType);
          return sum;
        },
        [],
      );
      acc.push(...antiNodes);
      return acc;
    },
    [],
  );

  return [...new Set(positionsWithAntiNode)].length;
};

run({
  part1: {
    tests: [
      {
        input: `..........
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........`,
        expected: 2,
      },
      //       {
      //         input: `..........
      // ..........
      // ..........
      // ....a.....
      // ........a.
      // .....a....
      // ..........
      // ..........
      // ..........
      // ..........`,
      //         expected: 4,
      //       },
      //       {
      //         input: `..........
      // ..........
      // ..........
      // ....a.....
      // ........a.
      // .....a....
      // ..........
      // ......A...
      // ..........
      // ..........`,
      //         expected: 4,
      //       },
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`,
        expected: 9,
      },
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
