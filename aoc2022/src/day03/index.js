import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = getInput(rawInput)
  const scoreMap = {
    ...generateAlphabetScoreMap(),
    ...generateAlphabetScoreMap(true)
  }

  return input.reduce((sum, rucksack) => {
    const [firstCompartment, secondCompartment] = splitRucksackCompartments(rucksack);
    const itemsInFirstCompartment = getItemsInCompartment(firstCompartment);
    const itemsInSecondCompartment = getItemsInCompartment(secondCompartment);
    Object.keys(itemsInFirstCompartment).forEach(item => {
      if (itemsInSecondCompartment[item]) {
        sum += scoreMap[item];
      }
    })
    return sum;
  }, 0);
};

const part2 = (rawInput) => {
  const input = getInput(rawInput);
  const groupsOfThreeElves = splitIntoChunks(input, 3);
  const scoreMap = {
    ...generateAlphabetScoreMap(),
    ...generateAlphabetScoreMap(true)
  }

  return groupsOfThreeElves.reduce((sum, elves) => {
    const [first, second, third] = elves;
    const itemsInFirst = getItemsInCompartment(first);
    const itemsInSecond = getItemsInCompartment(second);
    const itemsInThird = getItemsInCompartment(third);
    const badgeItem = getBadgeItem(itemsInFirst, itemsInSecond, itemsInThird);
    sum += scoreMap[badgeItem];
    return sum;
  }, 0);

  function getBadgeItem(itemsInFirst, itemsInSecond, itemsInThird) {
    return Object.keys(itemsInFirst).find(item => {
      return (itemsInSecond[item] && itemsInThird[item])
    })
  }
};

function getInput(rawInput) {
  return parseInput(rawInput).split(/\n/);
}

function splitRucksackCompartments(rucksack) {
  const half = Math.ceil(rucksack.length / 2);
  return [rucksack.slice(0, half), rucksack.slice(half)];
}

function generateAlphabetScoreMap(capital = false) {
  return [...Array(26)]
    .map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)))
    .reduce((acc, char, index) => {
      acc[char] = index + 1 + (!!capital * 26)
      return acc;
    }, {});
}

function getItemsInCompartment(compartment) {
  return compartment
    .split("")
    .reduce((acc, item) => {
      if (!acc[item]) {
        acc[item] = 1;
      } else {
        acc[item] = acc[item] + 1;
      }
      return acc;
    }, {})
}

function splitIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
