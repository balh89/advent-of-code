import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const stoneMap = createStoneMap(input);
  const sandCount = simulateSand(stoneMap);
  return sandCount

  function simulateSand(stoneMap) {
    const lowestRock = Math.max(...Object.keys(stoneMap))
    let foo = 0;
    while(true) {
      const sand = { x: 500, y: 0, moved: true };
      if (sand.y >= lowestRock) {
        break;
      }
      while(sand.moved && !sand.flowedIntoAbyss) {
        moveSand(sand, stoneMap);
        if (sand.y >= lowestRock) {
          sand.flowedIntoAbyss = true;
          break;
        }
      }
      if (sand.flowedIntoAbyss) {
        break;
      }
      if (!stoneMap[sand.y]) {
        stoneMap[sand.y] = {};
      }
      stoneMap[sand.y][sand.x] = "o";
      foo++;
    }
    return foo;
  }
  
  function moveSand(sand, stoneMap) {
    if (!stoneMap[sand.y + 1]) {
      stoneMap[sand.y + 1] = {};
    }
    if (!stoneMap[sand.y - 1]) {
      stoneMap[sand.y - 1] = {};
    }
    if (!stoneMap[sand.y + 1][sand.x]) {
      sand.y = sand.y + 1;
    } else if (!stoneMap[sand.y + 1][sand.x - 1]) {
      sand.y = sand.y + 1;
      sand.x = sand.x - 1;
    } else if (!stoneMap[sand.y + 1][sand.x + 1]) {
      sand.y = sand.y + 1;
      sand.x = sand.x + 1;
    } else {
      sand.moved = false;
    }
    return sand;
  }

  function createStoneMap(input) {
    const paths = input
      .split(/\n/)
      .map(path => {
        return path
          .split(/\s->\s/)
          .map(coordinates => coordinates.split(/,/))
      })
    
    const coordinates = {};
  
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      for (let j = 0; j < path.length; j++) {
        const coord1 = path[j];
        const coord2 = path[j+ 1];
        if (!coord2) {
          continue;
        }
        const [x1, y1] = coord1.map(x => +x);
        const [x2, y2] = coord2.map(x => +x);
        const horizontalDirection = x2 >= x1 ? "right" : "left";
        const verticalDirection = y2 >= y1 ? "down" : "up";
  
        for (let k = y1; verticalDirection === "down" ? k <= y2 : k >= y2; verticalDirection === "down" ? k++ : k--) {
          for (let l = x1; horizontalDirection === "right" ? l <= x2 : l >= x2; horizontalDirection === "right" ? l++ : l--) {
            if (!coordinates[k]) {
              coordinates[k] = {};
            }
            coordinates[k][l] = "#";
          }
        }
      }
    }
    return coordinates;
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const stoneMap = createStoneMap(input);
  const sandCount = simulateSand(stoneMap);
  return sandCount + 1;

  function simulateSand(stoneMap) {
    const lowestRock = Math.max(...Object.keys(stoneMap))
    const floor = lowestRock + 2;
    let foo = 0;
    while(true) {
      const sand = { x: 500, y: 0, moved: true };
      if (sand.y === 0 && sand.x === 500 && !sand.moved) {
        break;
      }
      while(sand.moved) {
        moveSand(sand, stoneMap, floor);
      }
      if (sand.y === 0 && sand.x === 500 && !sand.moved) {
        break;
      }
      if (!stoneMap[sand.y]) {
        stoneMap[sand.y] = {};
      }
      stoneMap[sand.y][sand.x] = "o";
      foo++;
    }
    return foo;
  }
  
  function moveSand(sand, stoneMap, floor) {
    if (sand.y + 1 === floor) {
      sand.moved = false;
      return sand;
    }
    if (!stoneMap[sand.y + 1]) {
      stoneMap[sand.y + 1] = {};
    }
    if (!stoneMap[sand.y - 1]) {
      stoneMap[sand.y - 1] = {};
    }
    if (!stoneMap[sand.y + 1][sand.x]) {
      sand.y = sand.y + 1;
    } else if (!stoneMap[sand.y + 1][sand.x - 1]) {
      sand.y = sand.y + 1;
      sand.x = sand.x - 1;
    } else if (!stoneMap[sand.y + 1][sand.x + 1]) {
      sand.y = sand.y + 1;
      sand.x = sand.x + 1;
    } else {
      sand.moved = false;
    }
    return sand;
  }

  function createStoneMap(input) {
    const paths = input
      .split(/\n/)
      .map(path => {
        return path
          .split(/\s->\s/)
          .map(coordinates => coordinates.split(/,/))
      })
    
    const coordinates = {};
  
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      for (let j = 0; j < path.length; j++) {
        const coord1 = path[j];
        const coord2 = path[j+ 1];
        if (!coord2) {
          continue;
        }
        const [x1, y1] = coord1.map(x => +x);
        const [x2, y2] = coord2.map(x => +x);
        const horizontalDirection = x2 >= x1 ? "right" : "left";
        const verticalDirection = y2 >= y1 ? "down" : "up";
  
        for (let k = y1; verticalDirection === "down" ? k <= y2 : k >= y2; verticalDirection === "down" ? k++ : k--) {
          for (let l = x1; horizontalDirection === "right" ? l <= x2 : l >= x2; horizontalDirection === "right" ? l++ : l--) {
            if (!coordinates[k]) {
              coordinates[k] = {};
            }
            coordinates[k][l] = "#";
          }
        }
      }
    }
    return coordinates;
  }
};


run({
  part1: {
    tests: [
      {
        input: `
        498,4 -> 498,6 -> 496,6
        503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        498,4 -> 498,6 -> 496,6
        503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
