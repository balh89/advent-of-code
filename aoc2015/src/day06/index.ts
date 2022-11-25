import run from "aocrunner";
import { create2DArray } from "../utils/index.js";
const actions = {
  TURN_ON: "turn on",
  TURN_OFF: "turn off",
  TOGGLE: "toggle",
};

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lightGrid = create2DArray(1000, 1000, 0);
  input
    .split("\n")
    .forEach((instruction) => performInstruction(instruction, lightGrid));
  return getLitLights(lightGrid);

  function performInstruction(rawInstruction: string, lightGrid: number[][]) {
    const [_, action, startCoords, endCoords] = rawInstruction.match(
      /^([a-z]+\s?[a-z]+)\s(\d+,\d+)\s\w+\s(\d+,\d+)/,
    );
    const [startX, startY] = startCoords
      .split(",")
      .map((coord) => parseInt(coord, 10));
    const [endX, endY] = endCoords
      .split(",")
      .map((coord) => parseInt(coord, 10));
    for (let i: number = startX; i <= endX; i++) {
      for (let j: number = startY; j <= endY; j++) {
        lightGrid[i][j] = getAction(lightGrid[i][j], action);
      }
    }
  }

  function getAction(currentValue: number, action: string): number {
    if (action === actions.TURN_OFF) {
      return 0;
    } else if (action === actions.TURN_ON) {
      return 1;
    } else {
      return currentValue === 0 ? 1 : 0;
    }
  }
};

function getLitLights(lightGrid: number[][]) {
  return lightGrid.reduce((litLights, row) => {
    litLights += row.reduce((ll, cell) => {
      ll += cell;
      return ll;
    }, 0);
    return litLights;
  }, 0);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lightGrid = create2DArray(1000, 1000, 0);
  input
    .split("\n")
    .forEach((instruction) => performInstruction(instruction, lightGrid));
  return getLitLights(lightGrid);

  function performInstruction(rawInstruction: string, lightGrid: number[][]) {
    const [_, action, startCoords, endCoords] = rawInstruction.match(
      /^([a-z]+\s?[a-z]+)\s(\d+,\d+)\s\w+\s(\d+,\d+)/,
    );
    const [startX, startY] = startCoords
      .split(",")
      .map((coord) => parseInt(coord, 10));
    const [endX, endY] = endCoords
      .split(",")
      .map((coord) => parseInt(coord, 10));
    for (let i: number = startX; i <= endX; i++) {
      for (let j: number = startY; j <= endY; j++) {
        lightGrid[i][j] += getAction(lightGrid[i][j], action);
      }
    }
  }

  function getAction(currentValue: number, action: string): number {
    if (action === actions.TURN_OFF) {
      return currentValue > 0 ? -1 : 0;
    } else if (action === actions.TURN_ON) {
      return 1;
    } else {
      return 2;
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: "turn on 0,0 through 999,999",
        expected: 1000000,
      },
      {
        input: `toggle 0,0 through 999,0`,
        expected: 1000,
      },
      {
        input: "turn off 499,499 through 500,500",
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `turn on 0,0 through 0,0`,
        expected: 1,
      },
      {
        input: "toggle 0,0 through 999,999",
        expected: 2000000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
