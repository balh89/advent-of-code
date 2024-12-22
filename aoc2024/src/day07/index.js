import run from "aocrunner";

const part1 = (rawInput) => {
  const operators = {
    ADD: "add",
    MULTIPLY: "multiply",
  };
  const equations = parseInput(rawInput);

  return equations.reduce((sum, equation) => {
    const { answer, numbers } = equation;
    const startValue = numbers.shift();
    const _isValid = isValid(answer, numbers, operators, startValue);

    if (_isValid) {
      return sum + answer;
    }

    return sum;
  }, 0);
};

const part2 = (rawInput) => {
  const equations = parseInput(rawInput);
  const operators = {
    ADD: "add",
    MULTIPLY: "multiply",
    CONCAT: "concat",
  };

  return equations.reduce((sum, equation, index) => {
    const { answer, numbers } = equation;
    const startValue = numbers.shift();
    const _isValid = isValid(answer, numbers, operators, startValue);

    if (_isValid) {
      return sum + answer;
    }

    return sum;
  }, 0);
};

function isValid(answer, numbers, operators, sum) {
  if (sum === answer && !numbers.length) {
    return true;
  }

  if (sum > answer) {
    return false;
  }

  if (!numbers.length) {
    return false;
  }

  const numbersCopy = numbers.slice();
  const currentNumber = numbersCopy.shift();
  return Object.values(operators).some((operator) => {
    if (operator === operators.ADD) {
      return isValid(answer, numbersCopy, operators, sum + currentNumber);
    }
    if (operator === operators.MULTIPLY) {
      return isValid(answer, numbersCopy, operators, sum * currentNumber);
    }
    if (operator === operators.CONCAT) {
      return isValid(answer, numbersCopy, operators, +`${sum}${currentNumber}`);
    }
  });
}

function parseInput(rawInput) {
  return rawInput.split(/\n/).map((line) => {
    const [answer, rawNumbers] = line.split(/:\s/);
    const numbers = rawNumbers.split(/\s/).map((number) => +number);
    return {
      answer: +answer,
      numbers,
    };
  });
}

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
