import run from "aocrunner";

const parseInput = (rawInput) => rawInput
  .split("\n")
  .map(line => line.split(/\s/).map(Number));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, line) => {
    const x = findFoo(line);
    return acc += x;
  }, 0);

  function findFoo(line, result = [line]) {
    const newFoo = line.map((entry, index) => {
      if (index === line.length - 1) {
        return;
      }
      return line[index + 1] - entry;
    })
    .filter(x => x !== undefined)
  
    result.push(newFoo);
  
    if (newFoo.every(x => x === 0)) {
      return result.reduce((sum, x) => {
        return sum += x[x.length - 1];
      }, 0)
    } else {
      return findFoo(newFoo, result)
    }
  }
};



const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, line) => {
    const x = findFoo(line);
    return acc += x.lastNum;
  }, 0);

  function findFoo(line, result = [line]) {
    const newFoo = line.map((entry, index) => {
      if (index === line.length - 1) {
        return;
      }
      return line[index + 1] - entry;
    })
    .filter(x => x !== undefined)
  
    result.push(newFoo);
  
    if (newFoo.every(x => x === 0)) {
      return result.reverse().reduce((acc, x, index) => {
        if (index === result.length - 1) {
          return acc;
        }
        const x1 = result[index + 1][0];

        acc.sum += (x1 - acc.lastNum);
        acc.lastNum = x1 - acc.lastNum;
        return acc;
      }, { sum: 0, lastNum: 0 })
    } else {
      return findFoo(newFoo, result)
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
