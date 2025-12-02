import run from "aocrunner";

const WALL = "#";
const FREE_SPACE = ".";
const BOX = "O";
const ROBOT = "@";

function processRobotMovement(map, robotPosition, movement) {
  let _robotPosition = robotPosition;
  let doBreak = false;
  let nextPosition = {
    y: _robotPosition.y + movement.y,
    x: _robotPosition.x + movement.x,
  };
  let hasBox = false;

  while (!doBreak) {
    if (map[nextPosition.y][nextPosition.x] === WALL) {
      doBreak = true;
    } else if (map[nextPosition.y][nextPosition.x] === FREE_SPACE) {
      if (hasBox) {
        map[nextPosition.y][nextPosition.x] = BOX;
        map[_robotPosition.y + movement.y][_robotPosition.x + movement.x] =
          FREE_SPACE;
      }
      map[_robotPosition.y][_robotPosition.x] = FREE_SPACE;
      _robotPosition = {
        y: _robotPosition.y + movement.y,
        x: _robotPosition.x + movement.x,
      };
      map[_robotPosition.y][_robotPosition.x] = ROBOT;
      doBreak = true;
    } else if (map[nextPosition.y][nextPosition.x] === BOX) {
      hasBox = true;
      nextPosition = {
        y: nextPosition.y + movement.y,
        x: nextPosition.x + movement.x,
      };
    }
  }

  return _robotPosition;
}

const part1 = (rawInput) => {
  const { map, movement, startPosition } = parseInput(rawInput);
  let robotPosition = startPosition;

  movement.forEach((movement) => {
    if (movement === "<") {
      robotPosition = processRobotMovement(map, robotPosition, { y: 0, x: -1 });
    } else if (movement === "^") {
      robotPosition = processRobotMovement(map, robotPosition, { y: -1, x: 0 });
    } else if (movement === ">") {
      robotPosition = processRobotMovement(map, robotPosition, { y: 0, x: 1 });
    } else if (movement === "v") {
      robotPosition = processRobotMovement(map, robotPosition, { y: 1, x: 0 });
    }
  });

  return calculateGPSPositions(map);
};

function calculateGPSPositions(map) {
  return map.reduce((acc, row, rowIndex) => {
    return (
      acc +
      row.reduce((score, cell, cellIndex) => {
        if (cell === BOX) {
          return score + (100 * rowIndex + cellIndex);
        }
        return score;
      }, 0)
    );
  }, 0);
}

function parseInput(rawInput) {
  const [rawMap, rawMovement] = rawInput.split(/\n\s*\n/);
  const map = create2dArray(rawMap);
  const startPosition = getStartPosition(map);
  const movement = rawMovement.split("");

  return { map, movement, startPosition };
}

function getStartPosition(grid) {
  return grid.reduce((acc, row, rowIndex) => {
    if (acc) {
      return acc;
    }
    return row.reduce((acc2, cell, cellIndex) => {
      if (acc2) {
        return acc2;
      }

      if (cell === ROBOT) {
        return { y: rowIndex, x: cellIndex };
      }
    }, "");
  }, "");
}

function create2dArray(input) {
  return input.split(/\n/).map((x) => x.split(""));
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      },
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 10092,
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
