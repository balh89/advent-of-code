import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let { digged } = input.reduce((acc, line) => {
    const [direction, length, color] = line.split(" ");
    for (let i = 1; i <= +length; i++ ) {
      const coordinates = getCoordinates(acc.location, direction);
      acc.location = coordinates;
      acc.digged.push({ ...acc.location, color })
    }
    return acc;
  }, { location: { x: 0, y: 0 }, digged: [{ x: 0, y: 0 }] })

  const minX = Math.abs(Math.min(...digged.map(({ x }) => x)));
  const minY = Math.abs(Math.min(...digged.map(({ y }) => y)));
  digged = digged.map(dug => {
    dug.x += minX;
    dug.y += minY;
    return dug;
  })
  const maxX = Math.abs(Math.max(...digged.map(({ x }) => x)));
  const maxY = Math.abs(Math.max(...digged.map(({ y }) => y)));

  const matrix = Array.from({ length: maxY + 1 }, x => Array.from({ length: maxX + 1 }).map(kake => "."))
  const wall = digged.reduce((wall, { x, y }) => {
    wall[+y][+x] = "#";
    return wall;
  }, matrix);

  return wall.reduce((cubicMeters, row) => {
    const { cubicMetersInRow } = row.reduce((acc, cell) => {
      if (cell === ".") {
        if (!acc.startLava) {
          return acc;
        }
        acc.cubicMetersInRow++;
      } else if (cell === "#") {
        acc.cubicMetersInRow++;
        if (!acc.startLava) {
          acc.startLava = true;
        } else {
          if (acc.lastCell === ".") {
            acc.startLava = false;
          }
        }
      }
      acc.lastCell = cell;
      return acc;
    }, { startLava: false, endLava: false, lastCell: "", cubicMetersInRow: 0 })
    return cubicMeters += cubicMetersInRow;
  }, 0)
};
function getCoordinates(location, direction, i = 1) {
  switch(direction) {
    case "R": {
      return { x: location.x + i, y: location.y };
    }
    case "D": {
      return { x: location.x, y: location.y + i };
    }
    case "U": {
      return { x: location.x, y: location.y - i };
    }
    case "L": {
      return { x: location.x - 1, y: location.y };
    }
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        R 6 (#70c710)
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)
        `,
        expected: 62,
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
