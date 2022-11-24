import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matchUp = /(\()/g;
  const matchDown = /(\))/g;
  const upCount: number = getMatches(matchUp);
  const downCount: number = getMatches(matchDown);
  return upCount - downCount;

  function getMatches(matcher: RegExp): number {
    return (input.match(matcher) || []).length;
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const UP = "(";
  const DOWN = ")";
  const BASEMENT = -1;
  const { position } = input.split("").reduce(
    (acc, instruction) => {
      if (acc.floor === BASEMENT) {
        return acc;
      }
      acc.position++;
      if (instruction === UP) {
        acc.floor++;
      } else if (instruction === DOWN) {
        acc.floor--;
      }
      return acc;
    },
    { floor: 0, position: 0 },
  );

  return position;
};

run({
  part1: {
    tests: [
      {
        input: `((())`,
        expected: 1,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `((())))`,
        expected: 7,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
