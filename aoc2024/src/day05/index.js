import run from "aocrunner";

const part1 = (rawInput) => {
  const { pageOrderRulesMap, updates } = parseInput(rawInput);

  return updates.reduce((acc, update) => {
    const isValid = update.every((number, index) => {
      return update
        .slice(index + 1)
        .every((x) => pageOrderRulesMap[number]?.[x]);
    });

    if (isValid) {
      const middle = Math.floor(update.length / 2);
      return acc + update[middle];
    }

    return acc;
  }, 0);
};

const part2 = (rawInput) => {
  const { pageOrderRulesMap, updates } = parseInput(rawInput);

  return updates.reduce((acc, update) => {
    const isValid = update.every((number, index) => {
      return update
        .slice(index + 1)
        .every((x) => pageOrderRulesMap[number]?.[x]);
    });

    if (!isValid) {
      const correctorder = getCorrectOrder(update, pageOrderRulesMap);
      const middle = Math.floor(correctorder.length / 2);
      return acc + correctorder[middle];
    }

    return acc;
  }, 0);

  function getCorrectOrder(list, orderRulesMap) {
    return list.toSorted((a, b) => {
      if (orderRulesMap[a]?.[b]) {
        return -1;
      }
      return 1;
    });
  }
};

function parseInput(rawInput) {
  const [_pageOrderingRules, _updates] = rawInput.split(/\n\s*\n/);
  const pageOrderingRules = _pageOrderingRules
    .split(/\n/)
    .map((rule) => rule.split("|").map((x) => x.trim()));
  const pageOrderRulesMap = pageOrderingRules.reduce((acc, rule) => {
    acc[+rule[0]] = acc[+rule[0]] || {};
    acc[+rule[0]][+rule[1]] = true;
    acc;

    return acc;
  }, {});
  const updates = _updates
    .split(/\n/)
    .map((x) => x.trim())
    .map((x) => x.split(",").map((x) => +x));

  return {
    pageOrderRulesMap,
    updates,
  };
}

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
