import run from "aocrunner";

const OBSTACLE = "#";
const CLEAR_PATH = ".";

const guardDirectionInGrid = {
  "^": { y: -1, x: 0 },
  ">": { y: 0, x: 1 },
  v: { y: 1, x: 0 },
  "<": { y: 0, x: -1 },
};

const turnMap = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^",
};

const part1 = async (rawInput) => {
  const { grid, guardPosition, guardDirection } =
    createGridAndFindGuard(rawInput);
  const _guardDirection = guardDirectionInGrid[guardDirection];
  const visitedPositions = getVisitedPositions(
    grid,
    guardPosition,
    guardDirection,
    _guardDirection,
  );
  return Object.keys(visitedPositions).length;
};

const part2 = (rawInput) => {
  let result = 0;
  const { grid, guardPosition, guardDirection } =
    createGridAndFindGuard(rawInput);
  const _guardDirection = guardDirectionInGrid[guardDirection];
  const visitedPositions = getVisitedPositions(
    grid,
    guardPosition,
    guardDirection,
    _guardDirection,
  );

  Object.values(visitedPositions).forEach(({ x, y }) => {
    grid[y][x] = OBSTACLE;
    const hasFinished = getVisitedPositions(
      grid,
      guardPosition,
      guardDirection,
      _guardDirection,
    );
    if (hasFinished === -1) {
      result++;
    }
    grid[y][x] = CLEAR_PATH;
  });
  return result;
};

function getVisitedPositions(
  grid,
  guardPosition,
  guardDirection,
  _guardDirection,
) {
  const guardPositionCopy = { ...guardPosition };
  let _guardDirectionCopy = { ..._guardDirection };
  let isFinished = false;
  const visitedPositions = {};
  visitedPositions[`y${guardPositionCopy.y}:x${guardPositionCopy.y}`] = {
    x: guardPositionCopy.x,
    y: guardPositionCopy.y,
  };
  let loops = 0;
  while (!isFinished && loops < 6000) {
    loops++;
    const newYPosition = guardPositionCopy.y + _guardDirectionCopy.y;
    const newXPosition = guardPositionCopy.x + _guardDirectionCopy.x;
    if (
      newYPosition >= grid.length ||
      newYPosition < 0 ||
      newXPosition < 0 ||
      newXPosition >= grid[0].length
    ) {
      isFinished = true;
    } else {
      const newPosition = grid[newYPosition][newXPosition];
      const positionIsObstacle = newPosition === OBSTACLE;
      if (positionIsObstacle) {
        const { newDirection, newDirectionInGrid } = turnRight(guardDirection);
        guardDirection = newDirection;
        _guardDirectionCopy = newDirectionInGrid;
      } else {
        guardPositionCopy.x = newXPosition;
        guardPositionCopy.y = newYPosition;
        visitedPositions[`y${newYPosition}:x${newXPosition}`] = {
          x: newXPosition,
          y: newYPosition,
        };
      }
    }
  }

  if (loops >= 6000) {
    return -1;
  }

  return visitedPositions;
}

function turnRight(currentDirection) {
  const newDirection = turnMap[currentDirection];
  const newDirectionInGrid = guardDirectionInGrid[newDirection];
  return { newDirection, newDirectionInGrid };
}

function createGridAndFindGuard(input) {
  const guardPosition = { x: null, y: null };
  const grid = input.split(/\n/).map((row, rowIndex) => {
    const splitRow = row.split("");
    const guardXPosition = splitRow.findIndex((cell) => cell === "^");
    if (guardXPosition !== -1) {
      guardPosition.x = guardXPosition;
      guardPosition.y = rowIndex;
    }
    return splitRow;
  });

  return { grid, guardPosition, guardDirection: "^" };
}

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
