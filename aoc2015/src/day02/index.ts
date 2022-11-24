import run from "aocrunner";
import { arrayMultiplier, multiplyArrayElements } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .split("\n")
    .reduce((paper, rawDimensions) => {
      const [l, w, h] = getDimensions(rawDimensions);
      const areas = [l * w, w * h, h * l];
      const slack = Math.min(...areas);
      const surfaceArea = getSurfaceArea(areas);
      paper += (surfaceArea + slack);
      return paper;
    }, 0);

  function getSurfaceArea(areas: Array<number>) {
    return areas.reduce((surfaceArea, area) => {
      surfaceArea += area * 2;
      return surfaceArea;
    }, 0)
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const multiplyByTwo = arrayMultiplier(2);
  return input
    .split("\n")
    .reduce((totalRibbon, rawDimensions) => {
      const dimensions = getDimensions(rawDimensions);
      const bowLength = getVolume(dimensions);
      const ribbonLength = getRibbonLength(multiplyByTwo, dimensions)
      totalRibbon += bowLength + ribbonLength;
      return totalRibbon;
    }, 0);
};

function getRibbonLength(multiplyByTwo: Function, dimensions: Array<number>) {
  const sortedDimensions = dimensions.sort((a: number, b: number) => a - b)
  return multiplyByTwo(sortedDimensions.slice(0, 2));
}

function getVolume(dimensions: Array<number>) {
  return multiplyArrayElements(dimensions)
}

function getDimensions(dimensions: string): Array<number> {
  return dimensions
    .split("x")
    .map(dimension => parseInt(dimension, 10));
}

run({
  part1: {
    tests: [
      {
        input: `2x3x4`,
        expected: 58,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1x1x10`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
