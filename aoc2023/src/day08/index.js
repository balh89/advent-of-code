import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");


const part1 = (rawInput) => {
  const [instructions,, ...rest] = parseInput(rawInput);
  const nodeMap = rest.reduce((acc, line) => {
    const [, position, left, right] = line.match(/^(\w{3}) = \((\w{3}), (\w{3})/)
    acc[position] = { L: left, R: right };
    return acc;
  }, {})

  let steps = 0;
  let currentPosition = "AAA";
  let currentInStructionIndex = 0;
  let currentInstruction;
  const instructionLength = instructions.length;
  const endPosition = "ZZZ";
  while(currentPosition !== endPosition) {
    if (currentInStructionIndex === instructionLength) {
      currentInStructionIndex = 0;
    }
    currentInstruction = instructions[currentInStructionIndex];
    currentPosition = nodeMap[currentPosition][currentInstruction];
    currentInStructionIndex++;
    steps++;
  }

  return steps;

};

const part2 = (rawInput) => {
  const [instructions,, ...rest] = parseInput(rawInput);
  const nodeMap = rest.reduce((acc, line) => {
    const [, position, left, right] = line.match(/^(\w{3}) = \((\w{3}), (\w{3})/)
    acc[position] = { L: left, R: right };
    return acc;
  }, {})
  let startPositions = Object.keys(nodeMap).filter(position => position.endsWith("A"));
  const endPositions = Object.keys(nodeMap).filter(position => position.endsWith("Z"));

  let steps = 0;
  let currentInStructionIndex = 0;
  let currentInstruction;
  const instructionLength = instructions.length;
  while(startPositions.some(position => !position.endsWith("Z"))) {
    steps++;
    if (currentInStructionIndex === instructionLength) {
      currentInStructionIndex = 0;
    }
    currentInstruction = instructions[currentInStructionIndex];
    startPositions = startPositions.map(position => {
      if (position.includes("-")) {
        return position;
      }
      const foo = nodeMap[position][currentInstruction];
      if (foo.endsWith("Z")) {
        return steps + "-" + foo;
      }
      return foo;
    })
    currentInStructionIndex++;
  }

  return startPositions.map(position => position.split("-")[0]).reduce(lcm)

};

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

run({
  part1: {
    tests: [
      {
        input: `
        RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)
        `,
        expected: 2,
      },
      {
        input: `
        LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)
        `,
        expected: 6,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)
        `,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
