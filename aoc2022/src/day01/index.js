import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input
    .split(/\n\n/)
    .reduce((highestCalories, elf) => {
       const calories = elf
        .split(/\n/)
        .reduce((totalCalories, calories) => {
          totalCalories += +calories;
          return totalCalories;
        }, 0)
        if (calories > highestCalories) {
          highestCalories = calories;
        }
        return highestCalories;
    }, 0)
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return input
    .split(/\n\n/)
    .reduce((elfCalories, elf) => {
       const calories = elf
        .split(/\n/)
        .reduce((totalCalories, calories) => {
          totalCalories += +calories;
          return totalCalories;
        }, 0)
        elfCalories.push(calories);
        return elfCalories;
    }, [])
    .sort((a, b) =>  b - a)
    .slice(0, 3)
    .reduce((sum, calories) => {
      sum += calories;
      return sum;
    }, 0)
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
