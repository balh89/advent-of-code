import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  
  const matrix = createMatrix(input);

  return matrix.reduce((acc, row, y) => {
    row.forEach((value, x) => {
      if (isNumeric(value)) {
        acc.number += value;
        acc.adjacentSymbol = acc.adjacentSymbol || checkForSymbol(matrix, { x, y })
      } else if (!isNumeric(value)) {
        if (acc.adjacentSymbol) {
          acc.sum += +acc.number;
        }
          acc.number = "";
          acc.adjacentSymbol = false;
      }
      if (x === row.length - 1) {
        if (acc.adjacentSymbol) {
          acc.sum += +acc.number;
        }
        acc.number = "";
      }
    })
    return acc;
  }, { sum: 0, number: "", adjacentSymbol: false }).sum
};

function checkForSymbol(matrix, coord) {
  const { x, y } = coord;
  const left = { x: x - 1, y };
  const right = { x: x + 1, y };
  const up = { x, y: y + 1 };
  const down = { x, y: y - 1 }
  const diagonalUpLeft = { x: x - 1, y: y - 1 }
  const diagonalDownLeft = { x: x - 1, y: y + 1 }
  const diagonalUpRight = { x: x + 1, y: y - 1 }
  const diagonalDownRight = { x: x + 1, y: y + 1 }

  const foo = [left, right, up, down, diagonalDownLeft, diagonalUpLeft, diagonalUpRight, diagonalDownRight]
  .filter(({ x, y }) => { 
    const xBigger = x >= 0;
    const xLesser = x <= matrix[0].length;
    const yBigger = y >= 0;
    const yLesser = y <= matrix.length - 1;
    return xBigger && xLesser && yBigger && yLesser;
  })
  return foo
    .some(isSymbol)

  function isSymbol({ x, y }) {
    const value = matrix[y][x];
    return !isNumeric(value) && value !== "." && value !== undefined;
  }
}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) &&
         !isNaN(parseFloat(str))
}

function createMatrix(input) {
  const arr = []
  for (let i = 0; i < input.length; i++) {
    arr[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      arr[i][j] = input[i][j];
    }
  }
  return arr;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const matrix = createMatrix(input);

  const { gearMap } =  matrix.reduce((acc, row, y) => {
    row.forEach((value, x) => {
      if (isNumeric(value)) {
        acc.number += value;
        const gears = checkForGear(matrix, { x, y })
        if (gears.length) {
          acc.totalGears.push(...gears)
        }
      } else if (!isNumeric(value)) {
        if (acc.totalGears.length) {
          acc.totalGears = [...new Set(acc.totalGears)];
          if (!acc.gearMap[acc.number]) {
            acc.gearMap[acc.number] = [];
          };
          acc.totalGears.forEach(gear => {
            acc.gearMap[acc.number].push(gear);
          })
        }
          acc.number = "";
          acc.totalGears = [];
          acc.adjacentGear = false;
      }
      if (x === row.length - 1) {
        if (acc.totalGears.length) {
          acc.totalGears = [...new Set(acc.totalGears)];
          if (!acc.gearMap[acc.number]) {
            acc.gearMap[acc.number] = [];
          };
          acc.totalGears.forEach(gear => {
            acc.gearMap[acc.number].push(gear);
          })
        }
        acc.number = "";
      }
    })
    return acc;
  }, { number: "", totalGears: [], gearMap: {} })

  const kake = Object.entries(gearMap).reduce((acc, [key, value]) => {
    value.forEach(gear => {
      const gearKey = `x:${gear.x}y:${gear.y}`
      if (!acc[gearKey]) {
        acc[gearKey] = [];
      }
      if (!acc[gearKey].includes(key)) {
        acc[gearKey].push(key);
      }
    })
    return acc;
  }, {})

  return Object.values(kake).map(x => x.filter(Boolean)).filter(x => x.length === 2).reduce((acc, x) => {
    acc += (+x[0] * +x[1]);
    return acc;
  }, 0)
};

function checkForGear(matrix, coord) {
  const { x, y } = coord;
  const left = { x: x - 1, y };
  const right = { x: x + 1, y };
  const up = { x, y: y + 1 };

  const down = { x, y: y - 1 }
  const diagonalUpLeft = { x: x - 1, y: y - 1 }
  const diagonalDownLeft = { x: x - 1, y: y + 1 }
  const diagonalUpRight = { x: x + 1, y: y - 1 }
  const diagonalDownRight = { x: x + 1, y: y + 1 }

  const foo = [left, right, up, down, diagonalDownLeft, diagonalUpLeft, diagonalUpRight, diagonalDownRight]
  .filter(({ x, y }) => {
    const xBigger = x >= 0;
    const xLesser = x <= matrix[0].length;
    const yBigger = y >= 0;
    const yLesser = y <= matrix.length - 1;
    return xBigger && xLesser && yBigger && yLesser;
  })
  return foo.reduce((acc, { y, x }) => {
    const value = matrix[y][x];
    if (value === "*") {
      acc.push({ y, x });
    }
    return acc;
  }, [])
}

run({
  part1: {
    tests: [
      {
        input: ".........+\n.50.50+.50",
        expected: 100,
      },
      {
        input: "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..",
        expected: 4361,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..",
        expected: 467835,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
