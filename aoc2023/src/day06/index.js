import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const [timeLine, distanceLine] = parseInput(rawInput);
  const times = timeLine.split(/^Time:\s+/)[1].split(/\s+/).map(Number)
  const recordDistances = distanceLine.split(/^Distance:\s+/)[1].split(/\s+/).map(Number)

  const winCounts = times.map((time, index) =>  determineWaysToWin(time, recordDistances[index]))
  return winCounts.reduce((acc, winCount) => {
    return acc *= winCount;
  }, 1)

  function determineWaysToWin(time, recordDistance) {
    let winCount = 0;
    for (let speed = 1; speed < time; speed++) {
      const  distance = speed * (time - speed);
      if (distance > recordDistance) {
        winCount++;
      }
    }
    return winCount;
  }
};

const part2 = (rawInput) => {
  const [timeLine, distanceLine] = parseInput(rawInput);
  const time = +timeLine.split(/^Time:\s+/)[1].split(/\s+/).reduce((acc, x) => {
    return acc += x;
  }, "")
  const recordDistance = +distanceLine.split(/^Distance:\s+/)[1].split(/\s+/).reduce((acc, x) => {
    return acc += x;
  }, "")

  return determineWaysToWin(time, recordDistance)

  function determineWaysToWin(time, recordDistance) {
    let winCount = 0;
    for (let speed = 1; speed < time; speed++) {
      const  distance = speed * (time - speed);
      if (distance > recordDistance) {
        winCount++;
      }
    }
    return winCount;
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200
        `,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200
        `,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
