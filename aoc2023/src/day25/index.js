;import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\n/);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const components = createComponents(input);
  return;
};

function createComponents(input) {
  return input.reduce((components, line) => {
    let [input, outputs] = line.split(": ");
    outputs = outputs.split(" ");
    if (!components[input]) {
      components[input] = {};
    }
    outputs.forEach(output => {
      if (!components[input][output]) {
        components[input][output] = true;
      }
      if (!components[output]) {
        components[output] = {};
      }
      if (!components[output][input]) {
        components[output][input] = true;
      }
    })
    return components;
  }, {})
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
        jqt: rhn xhk nvd
        rsh: frs pzl lsr
        xhk: hfx
        cmg: qnr nvd lhk bvb
        rhn: xhk bvb hfx
        bvb: xhk hfx
        pzl: lsr hfx nvd
        qnr: nvd
        ntq: jqt hfx bvb xhk
        nvd: lhk
        lsr: lhk
        rzs: qnr cmg lsr rsh
        frs: qnr lhk lsr
        `,
        expected: 54,
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
