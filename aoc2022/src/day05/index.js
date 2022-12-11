import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const [crates, procedures] = formatInput(input);
  const endCrates = performProcedure(crates, procedures);
  return Object.values(endCrates).reduce((acc, crate) => {
    acc += crate[0][1];
    return acc;
  }, "")

  function performProcedure(crates, procedures) {
    procedures.forEach(procedure => {
      console.count();
      const [_, count,__, start, ___, end] = procedure.trim().split(" ");
      crates[start].splice(0, +count).reverse().forEach(foo => crates[end].push(foo));
    })
    return crates;
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const [crates, procedures] = formatInput(input);
  const endCrates = performProcedure(crates, procedures);
  return Object.values(endCrates).reduce((acc, crate) => {
    acc += crate[0][1];
    return acc;
  }, "")

  function performProcedure(crates, procedures) {
    procedures.forEach(procedure => {
      const [_, count,__, start, ___, end] = procedure.trim().split(" ");
      crates[end].unshift(...crates[start].splice(0, +count));
    })
    return crates;
  }
};

function formatInput(input) {
  let [ crates, procedure ] = input.split(/\n\n/);
  crates = crates.split(/\n/).map(line => line.matchAll(/\[(.)\]|([^\S\r\n]{4}(?!\d))|(\d)/g))
  crates =  [...crates].map(x => [...x])
  crates = crates.map(x => x.map(y => y[0]))
  crates = transpose(crates)
  const crateMap = {};
  crates = crates.reduce((crateMap, crates) => {
    crateMap[crates[crates.length - 1]] = crates.slice(0, -1).filter(crate => !(/^\s+$/.test(crate)));;
    return crateMap;
  }, {})
  return [crates, procedure.split(/\n/)]
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}



run({
  part1: {
    tests: [
      // {
      //   input: `
      //       [D]    
      //   [N] [C]    
      //   [Z] [M] [P]
      //    1   2   3 
        
      //   move 1 from 2 to 1
      //   move 3 from 1 to 3
      //   move 2 from 2 to 1
      //   move 1 from 1 to 2`,
      //   expected: "CMZ",
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
