import run from "aocrunner";

const parseInput = (rawInput) => rawInput;
const instructions = {
  ADD_X: "addx",
  NOOP: "noop"
}

const cyclesToMeasureSignalStrength = {
  20: true,
  60: true,
  100: true,
  140: true,
  180: true,
  220: true
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const signals = input.split(/\n/);
  const { signalStrengthSum } = executeProgram(signals);
  return signalStrengthSum;

  function executeProgram(signals) {
    return signals.reduce((acc, signal) => {
      const [instruction, value] = signal.split(/\s/);
      if (instruction === instructions.ADD_X) {
        acc.cycle++;
        negotiateMeasureSignalStrength(acc);
        acc.cycle++;
        negotiateMeasureSignalStrength(acc);
        acc.register += +value;
      } else if (instruction === instructions.NOOP) {
        acc.cycle++;
        negotiateMeasureSignalStrength(acc);
      }
      return acc;
    }, { signalStrengthSum: 0, cycle: 0, register: 1 })
  }

  function negotiateMeasureSignalStrength(acc) {
    if (cyclesToMeasureSignalStrength[acc.cycle]) {
      acc.signalStrengthSum += acc.cycle * acc.register;
    }
  }

};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const signals = input.split(/\n/);
  const { CRT } = executeProgram(signals);
  return CRT.replace(/(.{40})/g, "$1\n");

  function executeProgram(signals) {
    return signals.reduce((acc, signal) => {
      const [instruction, value] = signal.split(/\s/);
      if (instruction === instructions.ADD_X) {
        acc.cycle++;
        drawCRT(acc);
        acc.cycle++;
        drawCRT(acc);
        acc.register += +value;
      } else if (instruction === instructions.NOOP) {
        acc.cycle++;
        drawCRT(acc);
      }
      return acc;
    }, {CRT: "", cycle: 0, register: 1, position: 0 })
  }

  function drawCRT(acc) {
    if ([acc.register - 1, acc.register, acc.register + 1].includes(acc.position)) {
      acc.CRT += "#";
    } else {
      acc.CRT += ".";
    }
    acc.position++;
    if (acc.position > 39) {
      acc.position = 0;
    }
  }
};



run({
  part1: {
    tests: [
      {
        input: `
        addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`,
        expected: `
        ##..##..##..##..##..##..##..##..##..##..
        ###...###...###...###...###...###...###.
        ####....####....####....####....####....
        #####.....#####.....#####.....#####.....
        ######......######......######......####
        #######.......#######.......#######.....`,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
