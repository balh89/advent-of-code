import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { patterns } = input.reduce((acc, line, index) => {
    if (line) {
      acc.currentPattern.push(line);
    } 
    if (!line || index === input.length - 1){
      acc.patterns.push(acc.currentPattern);
      acc.currentPattern = [];
    }
    return acc;
  }, { patterns: [], currentPattern: [] })

  const sumHorizontalReflection = patterns.reduce(getHorizontalReflection, 0);
  const sumVerticalReflection = patterns.reduce(getVerticalReflection, 0);
  return sumHorizontalReflection + sumVerticalReflection;
  
  function getHorizontalReflection(acc, pattern) {
    const reflectionIndex = pattern.reduce((reflectionIndex, line, index) => {
      if (reflectionIndex > -1) {
        return reflectionIndex;
      }

      let isReflecting = isPatternReflecting(index, index + 1, pattern);
      if (isReflecting) {
        reflectionIndex = index;
      }
      return reflectionIndex;
    }, -1)
    if (reflectionIndex !== -1) {
      acc += 100 * (reflectionIndex + 1);
    }
    return acc;

    function isPatternReflecting(firstIndex, secondIndex, array, isReflecting = false) {
      if (firstIndex < 0 || secondIndex > array.length - 1) {
        return isReflecting;
      }
      const firstLine = array[firstIndex];
      const secondLine = array[secondIndex];
      isReflecting = firstLine === secondLine;
      if (!isReflecting) {
        return false;
      }
  
      return isPatternReflecting(firstIndex - 1, secondIndex + 1, array, isReflecting);
    }
  }

  function getVerticalReflection(acc, pattern) {
    pattern = transpose(pattern);
    const reflectionIndex = pattern.reduce((reflectionIndex, line, index) => {
      if (reflectionIndex > -1) {
        return reflectionIndex;
      }

      let isReflecting = isPatternReflecting(index, index + 1, pattern);
      if (isReflecting) {
        reflectionIndex = index;
      }
      return reflectionIndex;
    }, -1)
    if (reflectionIndex !== -1) {
      acc += (reflectionIndex + 1);
    }
    return acc;

    function isPatternReflecting(firstIndex, secondIndex, array, isReflecting = false) {
      if (firstIndex < 0 || secondIndex > array.length - 1) {
        return isReflecting;
      }
      const firstLine = array[firstIndex];
      const secondLine = array[secondIndex];
      isReflecting = firstLine === secondLine;
      if (!isReflecting) {
        return false;
      }
  
      return isPatternReflecting(firstIndex - 1, secondIndex + 1, array, isReflecting);
    }
  }
};

function transpose(array) {
  return array[0].split("").map((_, colIndex) => array.map(row => row[colIndex]).join(""));
}


const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const { patterns } = input.reduce((acc, line, index) => {
    if (line) {
      acc.currentPattern.push(line);
    } 
    if (!line || index === input.length - 1){
      acc.patterns.push(acc.currentPattern);
      acc.currentPattern = [];
    }
    return acc;
  }, { patterns: [], currentPattern: [] })

  const sumHorizontalReflection = patterns.reduce(getHorizontalReflection, 0);
  const sumVerticalReflection = patterns.reduce(getVerticalReflection, 0);
  return sumHorizontalReflection + sumVerticalReflection;
  
  function getHorizontalReflection(acc, pattern) {
    for (let i = 0; i < pattern.length; i++) {
      const reflectionIndex = pattern.reduce((reflectionIndex, line, index) => {
        if (reflectionIndex > -1) {
          return reflectionIndex;
        }
  
        let isReflecting = isPatternReflecting(index, index + 1, i, pattern);
        if (isReflecting) {
          reflectionIndex = index;
        }
        return reflectionIndex;
      }, -1)
      if (reflectionIndex !== -1) {
        acc += 100 * (reflectionIndex + 1);
      }
    }

    return acc;

    function isPatternReflecting(firstIndex, secondIndex, changeIndex, array, isReflecting = false) {
      if (firstIndex < 0 || secondIndex > array.length - 1) {
        return isReflecting;
      }
      const firstLine = array[firstIndex];
      const secondLine = array[secondIndex];
      isReflecting = firstLine === secondLine;
      if (!isReflecting) {
        return false;
      }
  
      return isPatternReflecting(firstIndex - 1, secondIndex + 1, changeIndex, array, isReflecting);
    }
  }

  function getVerticalReflection(acc, pattern) {
    pattern = transpose(pattern);
    const reflectionIndex = pattern.reduce((reflectionIndex, line, index) => {
      if (reflectionIndex > -1) {
        return reflectionIndex;
      }

      let isReflecting = isPatternReflecting(index, index + 1, pattern);
      if (isReflecting) {
        reflectionIndex = index;
      }
      return reflectionIndex;
    }, -1)
    if (reflectionIndex !== -1) {
      acc += (reflectionIndex + 1);
    }
    return acc;

    function isPatternReflecting(firstIndex, secondIndex, array, isReflecting = false) {
      if (firstIndex < 0 || secondIndex > array.length - 1) {
        return isReflecting;
      }
      const firstLine = array[firstIndex];
      const secondLine = array[secondIndex];
      isReflecting = firstLine === secondLine;
      if (!isReflecting) {
        return false;
      }
  
      return isPatternReflecting(firstIndex - 1, secondIndex + 1, array, isReflecting);
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#
        `,
        expected: 405,
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
