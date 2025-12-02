import run from "aocrunner";
import fs from "node:fs";

const part1 = (rawInput) => {
  let input = parseInput(rawInput);
  // const bathRoomWidth = 11;
  // const bathRoomHeight = 7;
  const bathRoomWidth = 101;
  const bathRoomHeight = 103;
  for (let i = 0; i < 100; i++) {
    input = input.map(({ px, py, vx, vy }) => {
      let newPx = px + vx;
      if (newPx >= bathRoomWidth) {
        newPx = newPx - bathRoomWidth;
      } else if (newPx < 0) {
        newPx = bathRoomWidth + newPx;
      }
      let newPy = py + vy;
      if (newPy >= bathRoomHeight) {
        newPy = newPy - bathRoomHeight;
      } else if (newPy < 0) {
        newPy = bathRoomHeight + newPy;
      }

      return { px: newPx, py: newPy, vx, vy };
    });
  }

  const robotsInQuadrants = input.reduce(
    (robotsInQuadrants, robot) => {
      // if (robot.px < 5 && robot.py < 3) {
      //   robotsInQuadrants.leftUpper++;
      // } else if (robot.px > 5 && robot.py < 3) {
      //   robotsInQuadrants.rightUpper++;
      // } else if (robot.px > 5 && robot.py > 3) {
      //   robotsInQuadrants.rightLower++;
      // } else if (robot.px < 5 && robot.py > 3) {
      //   robotsInQuadrants.leftLower++;
      // }
      if (robot.px < 50 && robot.py < 51) {
        robotsInQuadrants.leftUpper++;
      } else if (robot.px > 50 && robot.py < 51) {
        robotsInQuadrants.rightUpper++;
      } else if (robot.px > 50 && robot.py > 51) {
        robotsInQuadrants.rightLower++;
      } else if (robot.px < 50 && robot.py > 51) {
        robotsInQuadrants.leftLower++;
      }
      return robotsInQuadrants;
    },
    {
      leftUpper: 0,
      rightUpper: 0,
      leftLower: 0,
      rightLower: 0,
    },
  );

  return Object.values(robotsInQuadrants).reduce(
    (safetyFactor, robotsInQuadrant) => {
      return safetyFactor * robotsInQuadrant;
    },
    1,
  );
};

const part2 = (rawInput) => {
  let input = parseInput(rawInput);
  // const bathRoomWidth = 11;
  // const bathRoomHeight = 7;
  const bathRoomWidth = 101;
  const bathRoomHeight = 103;
  for (let i = 0; i < 10500; i++) {
    input = input.map(({ px, py, vx, vy }) => {
      let newPx = px + vx;
      if (newPx >= bathRoomWidth) {
        newPx = newPx - bathRoomWidth;
      } else if (newPx < 0) {
        newPx = bathRoomWidth + newPx;
      }
      let newPy = py + vy;
      if (newPy >= bathRoomHeight) {
        newPy = newPy - bathRoomHeight;
      } else if (newPy < 0) {
        newPy = bathRoomHeight + newPy;
      }

      return { px: newPx, py: newPy, vx, vy };
    });

    const finalPosition = new Array(103)
      .fill(0)
      .map(() => new Array(101).fill("."));

    input.forEach((_input) => {
      finalPosition[_input.py][_input.px] = "#";
    });
    const prettyPrinted = prettyPrint(finalPosition);
    fs.appendFileSync(
      "./output.txt",
      `Iteration ${i + 1}:\n${prettyPrinted}\n${"=".repeat(bathRoomWidth)}\n\n`,
    );
  }
};

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

function parseInput(rawInput) {
  return rawInput.split(/\n/).map((line) => {
    const [, px, py, vx, vy] = line.match(/p=(\d+),(\d+)\sv=(-?\d+),(-?\d+)/);

    return { px: +px, py: +py, vx: +vx, vy: +vy };
  });
}

run({
  part1: {
    tests: [
      // {
      //   input: `p=0,4 v=3,-3
      // p=6,3 v=-1,-3
      // p=10,3 v=-1,2
      // p=2,0 v=2,-1
      // p=0,0 v=1,3
      // p=3,0 v=-2,-2
      // p=7,6 v=-1,-3
      // p=3,0 v=-1,-2
      // p=9,3 v=2,3
      // p=7,3 v=-1,2
      // p=2,4 v=2,-3
      // p=9,5 v=-3,-3`,
      //   expected: 12,
      // },
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
