import run from "aocrunner";

function parseInput(rawInput) {
  return rawInput
  .split(/\n/)
  .map((range) => range.split(""))
}

const part1 = (rawInput) => {
  const banks = parseInput(rawInput);

  return findTotalOutputJoltage(banks);

  function findTotalOutputJoltage(batteryBanks) {
    return batteryBanks.reduce((totalJoltage, bank) => totalJoltage += getMaximumJoltageFromBank(bank), 0)
  }

  function getMaximumJoltageFromBank(bank) {
    const { a, b } = bank.reduce((batteries, battery, index) => {
      if ((battery > batteries.a) && index !== bank.length - 1) {
        batteries.a = battery;
        batteries.b = 0;
      } else if (battery > batteries.b) {
        batteries.b = battery;
      }

      return batteries;
    }, { a: 0, b: 0 })

    return +`${a}${b}`
  }
};

const part2 = (rawInput) => {
  const banks = parseInput(rawInput);

  return findTotalOutputJoltage(banks);

  function findTotalOutputJoltage(batteryBanks) {
    return batteryBanks.reduce((totalJoltage, bank) => {
      const result = getMaximumJoltageFromBank(bank);
      totalJoltage += result;

      return totalJoltage;
    }, 0)
  }

  function getMaximumJoltageFromBank(bank) {
    const firstDigitLock = bank.length - 12;
    const batteries = bank.reduce((batteries, battery, index) => {
      for (let i = 0; i < 12; i++) {
        if (index <= firstDigitLock + i) {
          if (battery > batteries[i]) {
            batteries[i] = battery;
            for (let j = i + 1; j < 12; j++) {
              batteries[j] = 0;
            }
            break;
          }
        }
      }
      return batteries;
    }, new Array(12).fill(0))

    return +batteries.join("")
  }
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
