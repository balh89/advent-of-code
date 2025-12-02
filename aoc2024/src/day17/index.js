import run from "aocrunner";

class Computer {
  constructor(A, B, C, program) {
    this.instructionPointer = 0;
    this.A = A;
    this.B = B;
    this.C = C;
    this.program = program;
    this.output = "";
    this.operandsMap = {
      ADV: 0,
      BXL: 1,
      BST: 2,
      JNZ: 3,
      BXC: 4,
      OUT: 5,
      BDV: 6,
      CDV: 7,
    };
    this.instructions = {
      [this.operandsMap.ADV]: (comboOperand) => {
        const comboOperandValue = this.getComboOperandValue(comboOperand);

        this.A = Math.floor(this.A / 2 ** comboOperandValue);
        this.increaseInstructionPointer();
      },
      [this.operandsMap.BXL]: (literalOperand) => {
        this.B = this.B ^ literalOperand;
        this.increaseInstructionPointer();
      },
      [this.operandsMap.BST]: (comboOperand) => {
        const comboOperandValue = this.getComboOperandValue(comboOperand);

        this.B = comboOperandValue & 7;
        this.increaseInstructionPointer();
      },
      [this.operandsMap.JNZ]: (literalOperand) => {
        if (this.A === 0) {
          this.increaseInstructionPointer();
          return;
        }

        const isAJump = literalOperand !== this.instructionPointer;
        this.instructionPointer = literalOperand;
        if (!isAJump) {
          this.increaseInstructionPointer();
        }
      },
      [this.operandsMap.BXC]: () => {
        this.B = this.B ^ this.C;
        this.increaseInstructionPointer();
      },
      [this.operandsMap.OUT]: (comboOperand) => {
        const comboOperandValue = this.getComboOperandValue(comboOperand);
        this.writeOutput(comboOperandValue & 7);
        this.increaseInstructionPointer();
      },
      [this.operandsMap.BDV]: (comboOperand) => {
        const comboOperandValue = this.getComboOperandValue(comboOperand);

        this.B = Math.floor(this.A / 2 ** comboOperandValue);
        this.increaseInstructionPointer();
      },
      [this.operandsMap.CDV]: (comboOperand) => {
        const comboOperandValue = this.getComboOperandValue(comboOperand);

        this.C = Math.floor(this.A / 2 ** comboOperandValue);
        this.increaseInstructionPointer();
      },
    };
  }

  hasInstructionToRun() {
    return !!(
      this.program[this.instructionPointer] !== undefined &&
      this.program[this.instructionPointer + 1] !== undefined
    );
  }

  runProgram() {
    while (this.hasInstructionToRun()) {
      const instruction = this.getInstruction();
      const operand = this.getOperand();
      this.runInstruction(instruction, operand);
    }

    return this.output;
  }

  runInstruction(instruction, operand) {
    instruction(operand);
  }

  writeOutput(value) {
    this.output += `${this.output ? "," : ""}${value}`;
  }

  increaseInstructionPointer() {
    this.instructionPointer += 2;
  }

  getComboOperandValue(comboOperand) {
    switch (comboOperand) {
      case 0:
      case 1:
      case 2:
      case 3: {
        return comboOperand;
      }
      case 4: {
        return this.A;
      }
      case 5: {
        return this.B;
      }
      case 6: {
        return this.C;
      }
    }
  }

  getInstruction() {
    const opCode = this.program[this.instructionPointer];
    return this.instructions[opCode];
  }

  getOperand() {
    return this.program[this.instructionPointer + 1];
  }
}

const part1 = (rawInput) => {
  const { A, B, C, program } = parseInput(rawInput);
  const computer = new Computer(A, B, C, program);
  const output = computer.runProgram();

  return output;
};

const part2 = (rawInput) => {
  const { B, C, program } = parseInput(rawInput);
  let output;
  let A = -1;
  while (output !== program) {
    A++;
    const computer = new Computer(A, B, C, program);
    output = computer.runProgram();
    // console.log(A);
  }

  return A;
};

function parseInput(rawInput) {
  const [rawA, rawB, rawC, _, rawProgram] = rawInput.split(/\n/);
  const A = +rawA.split(": ")[1];
  const B = +rawB.split(": ")[1];
  const C = +rawC.split(": ")[1];
  const program = rawProgram
    .split(": ")[1]
    .split(",")
    .map((x) => +x);

  return { A, B, C, program };
}

run({
  part1: {
    tests: [
      {
        input: `Register A: 0
Register B: 29
Register C: 0

Program: 1,7`,
        expected: "",
      },
      {
        input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: "4,2,5,6,7,7,7,7,3,1,0",
      },
      {
        input: `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`,
        expected: "0,1,2",
      },
      {
        input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
      {
        input: `Register A: 41644071
Register B: 0
Register C: 0

Program: 2,4,1,2,7,5,1,7,4,4,0,3,5,5,3,0`,
        expected: "3,1,5,3,7,4,2,7,5",
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
