import run from "aocrunner";

const parseInput =(rawInput) => {
  let [freshIngredientRanges, ingredientIds] = rawInput.split(/\n\s*\n/)
  freshIngredientRanges = freshIngredientRanges.split(/\n/).map(range => range.split("-").map(Number))
  ingredientIds = ingredientIds.split(/\n/).map(Number)

  return { freshIngredientRanges, ingredientIds }
};

const part1 = (rawInput) => {
  const { freshIngredientRanges, ingredientIds } = parseInput(rawInput);

  return getFreshIngredientCount(freshIngredientRanges, ingredientIds)

  function getFreshIngredientCount(freshIngredientRanges, ingredientIds) {
    return ingredientIds.reduce((freshCount, id) => {
      if (isIdFresh(id, freshIngredientRanges)) {
        freshCount++;
      }

      return freshCount;
    }, 0)
  }

  function isIdFresh(id, freshIngredientRanges) {
    return freshIngredientRanges.some(([start, end]) => id >= start && id <= end)
  }
};

const part2 = (rawInput) => {
 const { freshIngredientRanges  } = parseInput(rawInput); 
 freshIngredientRanges.sort((a, b) => a[0] - b[0])

 const mergedRanges = mergeRanges(freshIngredientRanges);

 return mergedRanges.reduce((idCount, range) => {
  idCount += (range[1] - range[0]) + 1;

  return idCount
 }, 0)

 function mergeRanges(ranges) {
  return ranges.reduce((mergedRanges, range) => {
    const lastRange = mergedRanges.at(-1);
    if (!lastRange) {
      mergedRanges.push(range);
      return mergedRanges;
    }

    if (isRangesOverlapping(range, lastRange)) {
      const newStart = Math.min(range[0], lastRange[0]);
      const newEnd = Math.max(range[1], lastRange[1]);
      mergedRanges.splice(-1, 1, [newStart, newEnd])
    } else {
      mergedRanges.push(range);
    }

    return mergedRanges
  }, [])
}

 function isRangesOverlapping(range1, range2) {
  return (range1[0] <= range2[1]) && (range1[1] >= range2[0]) 
 }
};

run({
  part1: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 3,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 14,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
