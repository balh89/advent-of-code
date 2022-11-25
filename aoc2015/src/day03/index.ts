import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Coordinates = {
  x: number;
  y: number;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves = input.split("");

  const { visitedHouses } = getVisitedHouses(moves);
  return Object.keys(visitedHouses).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves = input.split("");
  const santaMoves = moves.filter((_, i) => !(i % 2));
  const robotSantaMoves = moves.filter((_, i) => i % 2);
  const santasVisitedHouses = getVisitedHouses(santaMoves);
  const robotSantasVisitedHouses = getVisitedHouses(robotSantaMoves);
  return Object.keys({
    ...santasVisitedHouses.visitedHouses,
    ...robotSantasVisitedHouses.visitedHouses,
  }).length;
};

function getVisitedHouses(moves: Array<string>) {
  return moves.reduce(
    (acc, move) => {
      acc.coordinates = getCoordinates(acc.coordinates, move);
      const { x, y } = acc.coordinates;
      const key = `x:${x}y:${y}`;
      acc.visitedHouses[key] = acc.visitedHouses[key]
        ? acc.visitedHouses[key] + 1
        : 1;
      return acc;
    },
    { coordinates: { x: 0, y: 0 }, visitedHouses: { "x:0y:0": 1 } },
  );
}

function getCoordinates(currentCoordinates: Coordinates, move: string) {
  const newCoordinates = { ...currentCoordinates };
  switch (move) {
    case ">": {
      newCoordinates.x++;
      break;
    }
    case "v": {
      newCoordinates.y--;
      break;
    }
    case "<": {
      newCoordinates.x--;
      break;
    }
    case "^": {
      newCoordinates.y++;
      break;
    }
    default: {
      break;
    }
  }
  return newCoordinates;
}

run({
  part1: {
    tests: [
      {
        input: `^v^v^v^v^v`,
        expected: 2,
      },
      {
        input: ">",
        expected: 2,
      },
      {
        input: "^>v<",
        expected: 4,
      },
      {
        input: ">>>>>vvvvv",
        expected: 11,
      },
      {
        input: ">>>>>v<<<<<^",
        expected: 12,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `^v`,
        expected: 3,
      },
      {
        input: "^>v<",
        expected: 3,
      },
      {
        input: "^v^v^v^v^v",
        expected: 11,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
