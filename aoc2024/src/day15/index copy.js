import run from "aocrunner";

const WALL = "#";
const FREE_SPACE = ".";
const BOX = "O";
const ROBOT = "@";

function processRobotMovement({ map, robotPosition, movement }) {
  let doBreak = false;
  let nextPosition = {
    y: robotPosition.y + movement.y,
    x: robotPosition.x + movement.x,
  };
  let hasBox = false;
  while (!doBreak) {
    if (map[nextPosition.y][nextPosition.x] === WALL) {
      doBreak = true;
    } else if (map[nextPosition.y][nextPosition.x] === FREE_SPACE) {
      if (hasBox) {
        map[nextPosition.y][nextPosition.x] = BOX;
        map[robotPosition.y + movement.y][robotPosition.x + movement.x] =
          FREE_SPACE;
      }
      map[robotPosition.y][robotPosition.x] = FREE_SPACE;
      robotPosition = {
        y: robotPosition.y + movement.y,
        x: robotPosition.x + movement.x,
      };
      map[robotPosition.y][robotPosition.x] = ROBOT;
      doBreak = true;
    } else if (map[nextPosition.y][nextPosition.x] === BOX) {
      hasBox = true;
      nextPosition = {
        y: nextPosition.y + movement.y,
        x: nextPosition.x + movement.x,
      };
    }
  }
}

const part1 = (rawInput) => {
  const { map, movement } = parseInput(rawInput);
  let robotPosition = {
    y: 2,
    x: 2,
  };
  movement.forEach((movement, index) => {
    console.log(index);
    if (movement === "<") {
      console.log("<");
      robotPosition = processRobotMovement(map, robotPosition, { y: 0, x: -1 });
    } else if (movement === "^") {
      console.log("^");
      robotPosition = processRobotMovement({
        map,
        robotPosition,
        movement: { y: -1, x: 0 },
      });
    } else if (movement === ">") {
      console.log(">");
      robotPosition = processRobotMovement({
        map,
        robotPosition,
        movement: { y: 0, x: 1 },
      });
    } else {
      console.log("v");
      robotPosition = processRobotMovement({
        map,
        robotPosition,
        movement: { y: 1, x: 0 },
      });
    }
    // console.log(prettyPrint(map));
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

function prettyPrint(input) {
  return input.reduce((sum, row) => {
    sum += row.reduce((rowSum, dot) => {
      rowSum += dot;
      return rowSum;
    }, "");
    sum += "\n";
    return sum;
  }, "");
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

function parseInput(rawInput) {
  const [rawMap, rawMovement] = rawInput.split(/\n\s*\n/);
  const map = create2dArray(rawMap);
  const movement = rawMovement.split("");

  return { map, movement };
}

function create2dArray(input) {
  return input.split(/\n/).map((x) => x.split(""));
}

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
  onlyTests: true,
});
