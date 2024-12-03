import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const matrix = createMatrix(input);
  const galaxies = findGalaxies(matrix);
  const pairOfGalaxies = findPairOfGalaxies(galaxies);
  return pairOfGalaxies.reduce((sum, { first, second }) => {
    const distanceBetweenGalaxies = findDistanceBetweenGalaxies(first, second);
    return sum += distanceBetweenGalaxies;
  }, 0);
};

function findDistanceBetweenGalaxies(first, second) {
  // return Math.sqrt(Math.pow((second.x - first.x), 2) + (Math.pow((second.y - first.y), 2)));
  return (Math.abs(second.y - first.y) + Math.abs(second.x - first.x))
}

function findPairOfGalaxies(galaxies) {
  return galaxies.reduce((pairs, galaxy, index) => {
    if (index + 1 !== galaxies.length) {
      galaxies.slice(index + 1).forEach(gal => {
        pairs.push({ first: galaxy, second: gal })
      })
    }
    return pairs
  }, []);
}

function findGalaxies(matrix) {
  return matrix.reduce((acc, y, indexY) => {
    y.forEach((x, indexX) => {
      if (x === "#") {
        acc.push({ y: indexY, x: indexX });
      }
    })
    return acc;
  }, [])
}

function createMatrix(input) {
  const matrix = []
  for (let i = 0; i < input.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      const value = input[i][j];
      matrix[i][j] = value;
    }
  }

  return matrix

  // const addedRows = matrix.reduce((acc, y) => {
  //   acc.push(y);
  //   if (y.every(n => n === ".")) {
  //     acc.push(y);
  //   }
  //   return acc;
  // }, [])

  // return addedRows.reduce((acc, y, index) => {
  //   const column = addedRows.map(x => x[index]);
  //   acc.push(y);
  //   if (column.every(n => n === ".")) {
  //     acc.push(y);
  //   }
  //   return acc;
  // }, [])

  // return transpose(transpose(addedRows.reduce((acc, y) => {
  //   acc.push(y);
  //   if (y.every(n => n === ".")) {
  //     acc.push(y);
  //   }
  //   return acc;
  // }, [])))
}

// function transpose(array) {
//   return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
// }

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        ....#........
        .........#...
        #............
        .............
        .............
        ........#....
        .#...........
        ............#
        .............
        .............
        .........#...
        #....#.......
        `,
        expected: 374,
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
