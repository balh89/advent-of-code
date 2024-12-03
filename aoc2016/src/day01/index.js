import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const instructions = input.split(", ");
  const directions = {
    NORTH: "n",
    WEST: "w",
    SOUTH: "s",
    EAST: "e"
  };
  const turnDirections = {
    LEFT: "L",
    RIGHT: "R"
  };


  let currentDirection = directions.NORTH;
  const coordinates = { x: 0, y :0 }

  performInstructions(instructions);
  return calculateShortestPathLength();

  function calculateShortestPathLength() {
    console.log(coordinates);
    return Math.abs(0 - coordinates.x) + Math.abs(0 - coordinates.y);
  }

  function performInstructions(instructions) {
    instructions.forEach(performInstruction)
  }

  function performInstruction(instruction) {
    const direction = instruction[0];
    const moveCount = parseInt(instruction.slice(1));
    currentDirection = getTurnDirection(direction)
    performMove(moveCount);
  }

  function getTurnDirection(direction) {
    if (direction === turnDirections.LEFT) {
      switch(currentDirection) {
        case directions.NORTH: {
          return directions.WEST;
        }
        case directions.WEST: {
          return directions.SOUTH;
        }
        case directions.SOUTH: {
          return directions.EAST;
        }
        case directions.EAST: {
          return directions.NORTH;
        }
      }
    } else if (direction === turnDirections.RIGHT) {
      switch(currentDirection) {
        case directions.NORTH: {
          return directions.EAST;
        }
        case directions.WEST: {
          return directions.NORTH;
        }
        case directions.SOUTH: {
          return directions.WEST;
        }
        case directions.EAST: {
          return directions.SOUTH;
        }
      }
    }
  }

  function performMove(moveCount) {
    switch(currentDirection) {
      case directions.NORTH: {
        return coordinates.y += +moveCount;
      }
      case directions.WEST: {
        return coordinates.x -= +moveCount;
      }
      case directions.SOUTH: {
        return coordinates.y -= +moveCount;
      }
      case directions.EAST: {
        return coordinates.x += +moveCount;
      }
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const instructions = input.split(", ");
  const directions = {
    NORTH: "n",
    WEST: "w",
    SOUTH: "s",
    EAST: "e"
  };
  const turnDirections = {
    LEFT: "L",
    RIGHT: "R"
  };


  let currentDirection = directions.NORTH;
  const coordinates = { x: 0, y :0 }
  const visitedLocations = { 0: {
    0: 1
  }}
  let visitedTwice = null

  performInstructions(instructions);
  return calculateShortestPathLength();

  function calculateShortestPathLength() {
    console.log(visitedTwice);
    return Math.abs(0 - coordinates.x) + Math.abs(0 - coordinates.y);
  }

  function performInstructions(instructions) {
    instructions.reduce((acc, instruction) => {
      if (visitedTwice) {
        return;
      }
      performInstruction(instruction);
      setVisitedLocations();
    }, {})
  }


  function setVisitedLocations() {
    const { x, y } = coordinates;
    if (!visitedLocations[x]) {
      visitedLocations[x] = {}; 
    }
    visitedLocations[x][y] = visitedLocations[x][y] ? visitedLocations[x][y] + 1 : 1;
    if (visitedLocations[x][y] > 1) {
      visitedTwice = { x, y }
    }
  }

  function performInstruction(instruction) {
    const direction = instruction[0];
    const moveCount = parseInt(instruction.slice(1));
    currentDirection = getTurnDirection(direction)
    performMove(moveCount);
  }

  function getTurnDirection(direction) {
    if (direction === turnDirections.LEFT) {
      switch(currentDirection) {
        case directions.NORTH: {
          return directions.WEST;
        }
        case directions.WEST: {
          return directions.SOUTH;
        }
        case directions.SOUTH: {
          return directions.EAST;
        }
        case directions.EAST: {
          return directions.NORTH;
        }
      }
    } else if (direction === turnDirections.RIGHT) {
      switch(currentDirection) {
        case directions.NORTH: {
          return directions.EAST;
        }
        case directions.WEST: {
          return directions.NORTH;
        }
        case directions.SOUTH: {
          return directions.WEST;
        }
        case directions.EAST: {
          return directions.SOUTH;
        }
      }
    }
  }

  function performMove(moveCount) {
    switch(currentDirection) {
      case directions.NORTH: {
        return coordinates.y += +moveCount;
      }
      case directions.WEST: {
        return coordinates.x -= +moveCount;
      }
      case directions.SOUTH: {
        return coordinates.y -= +moveCount;
      }
      case directions.EAST: {
        return coordinates.x += +moveCount;
      }
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `R2, L3`,
        expected: 5,
      },
      {
        input: `R2, R2, R2`,
        expected: 2,
      },
      {
        input: `R5, L5, R5, R3`,
        expected: 12,
      },
      {
        input: "L2, L3, L3, L4, R1",
        expected: 3
      },
      {
        input: "L2, L3, L3, L4, R1, R2, L3",
        expected: 6
      },
      {
        input: "L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1",
        expected: 7
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R8, R4, R4, R8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
