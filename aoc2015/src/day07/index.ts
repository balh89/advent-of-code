import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let cache = {};
  const input = parseInput(rawInput);
  const instructionMap = getInStructionMap(input);
  const signalValue = getSignal(instructionMap, "a", cache);
  if (signalValue < 0) {
    return 65535 + signalValue + 1;
  } else {
    return signalValue;
  }
};

function getInStructionMap(input: string) {
  return input.split("\n").reduce((acc: any, instruction) => {
    const [_, value, key] = instruction.match(/^(.+) -> (\w+)\s?$/) || [];
    acc[key] = value;
    return acc;
  }, {});
}

function getSignal(instructionMap: any, signalKey: string, cache: any) {
  if (cache[signalKey]) {
    return cache[signalKey];
  }
  if (!isNaN(signalKey)) {
    const signalValueNumber = Number(signalKey);
    if (signalValueNumber < 0) {
      return 65535 - signalValueNumber + 1;
    } else {
      return signalValueNumber;
    }
  }
  const signalValue = instructionMap[signalKey];
  if (!isNaN(signalValue)) {
    const signalValueNumber = Number(signalValue);
    if (signalValueNumber < 0) {
      return 65535 - signalValueNumber + 1;
    } else {
      return signalValueNumber;
    }
  }
  if (signalValue.includes("AND")) {
    const [_, a, b] = signalValue.match(/^(\w{1,2}) AND (\w{1,2})/) || [];
    cache[signalKey] =
      getSignal(instructionMap, a, cache) & getSignal(instructionMap, b, cache);
    return cache[signalKey];
  } else if (signalValue.includes("LSHIFT")) {
    const [_, a, b] = signalValue.match(/^(\w{1,2}) LSHIFT (\w{1,2})/) || [];
    cache[signalKey] =
      getSignal(instructionMap, a, cache) <<
      getSignal(instructionMap, b, cache);
    return cache[signalKey];
  } else if (signalValue.includes("RSHIFT")) {
    const [_, a, b] = signalValue.match(/^(\w{1,2}) RSHIFT (\w{1,2})/) || [];
    cache[signalKey] =
      getSignal(instructionMap, a, cache) >>
      getSignal(instructionMap, b, cache);
    return cache[signalKey];
  } else if (signalValue.includes("OR")) {
    const [_, a, b] = signalValue.match(/^(\w{1,2}) OR (\w{1,2})/) || [];
    cache[signalKey] =
      getSignal(instructionMap, a, cache) | getSignal(instructionMap, b, cache);
    return cache[signalKey];
  } else if (signalValue.includes("NOT")) {
    const [_, a] = signalValue.match(/^NOT\s(\w{1,2})/) || [];
    cache[signalKey] = ~getSignal(instructionMap, a, cache);
    return cache[signalKey];
  } else {
    cache[signalKey] = getSignal(instructionMap, signalValue, cache);
    return cache[signalKey];
  }
}

const part2 = (rawInput: string) => {
  let cache = {};
  const input = parseInput(rawInput);
  const instructionMap = getInStructionMap(input);
  instructionMap["b"] = 16076;
  const signalValue = getSignal(instructionMap, "a", cache);
  if (signalValue < 0) {
    return 65535 + signalValue + 1;
  } else {
    return signalValue;
  }
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   123 -> x
      //   456 -> y
      //   x AND y -> d
      //   x OR y -> e
      //   x LSHIFT 2 -> f
      //   y RSHIFT 2 -> g
      //   NOT x -> h
      //   NOT y -> i
      //   `,
      //   expected: 65079,
      // },
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
