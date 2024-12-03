import run from "aocrunner";

const part1 = (rawInput) => {
  const { leftList, rightList } = parseInput(rawInput);
  leftList.sort();
  rightList.sort();

  return getTotalDistance(leftList, rightList);

  function getTotalDistance(leftList, rightList) {
    return leftList.reduce((totalDistance, leftNumber, index) => {
      const rightNumber = rightList[index];
      const distance = Math.abs(leftNumber - rightNumber);

      return totalDistance + distance;
    }, 0);
  }
};

const part2 = (rawInput) => {
  const { leftList, rightList } = parseInput(rawInput);
  const rightListCountMap = getListCountMap(rightList);

  return getSimilarityScore(leftList, rightListCountMap);

  function getSimilarityScore(leftList, rightListCountMap) {
    return leftList.reduce((score, number) => {
      return score + number * (rightListCountMap[number] || 0);
    }, 0);
  }

  function getListCountMap(list) {
    return list.reduce((acc, number) => {
      acc[number] = acc[number] || 0;
      acc[number]++;

      return acc;
    }, {});
  }
};

function parseInput(rawInput) {
  return rawInput.split(/\s+/).reduce(
    (acc, number, index) => {
      const isEven = index % 2 === 0;
      if (isEven) {
        acc.leftList.push(+number);
      } else {
        acc.rightList.push(+number);
      }

      return acc;
    },
    { leftList: [], rightList: [] },
  );
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
