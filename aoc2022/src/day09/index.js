import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const commandTypes = {
  LEFT: "L",
  UP: "U",
  RIGHT: "R",
  DOWN: "D"
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const commands = parseCommands(input);
  const { visitedPositions } = executeCommands(commands);
  return visitedPositions.size;

  function executeCommands(commands) {
    return commands.reduce((acc, command) => {
      executeCommand(acc, command)
      return acc;
    }, { tail: { x: 0, y: 0 }, head: { x: 0, y: 0 }, visitedPositions: new Set() })
  }

  function executeCommand(acc, commandInput) {
    const [command, value] = commandInput;
    for (let i = 0; i < value; i++) {
      moveHead(command, acc.head);
      negotiateMoveKnot(acc.head, acc.tail)
      saveTailPosition(acc.tail, acc.visitedPositions);
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const commands = parseCommands(input);
  const TAIL = 9;
  const { visitedPositions } = executeCommands(commands);
  return visitedPositions.size;

  function executeCommands(commands) {
    return commands.reduce((acc, command) => {
      executeCommand(acc, command)
      return acc;
    }, getInitValue())

    function getInitValue() {
      const initValue = {
        head: { x: 0, y: 0 },
        visitedPositions: new Set()
      }
      for (let i = 1; i < 10; i++) {
        initValue[i] = { x: 0, y: 0 };
      }
      return initValue;
    }

    function executeCommand(acc, commandInput) {
      const [command, value] = commandInput;
      let prevKnot;
      for (let i = 0; i < value; i++) {
        moveHead(command, acc.head);
        for (let knot = 1; knot < 10; knot++) {
          prevKnot = knot === 1 ? acc.head : acc[knot - 1];
          negotiateMoveKnot(prevKnot, acc[knot])
          if (knot === TAIL) {
            saveTailPosition(acc[knot], acc.visitedPositions);
          }
        }
      }
    }
  }
};

function saveTailPosition(tail, visitedPositions) {
  visitedPositions.add(`x:${tail.x}y:${tail.y}`);
}

function negotiateMoveKnot(prevKnot, knot) {
  //knots are on the same row
  if (prevKnot.y === knot.y) {
    //prevKnot is two or more to the right
    if (prevKnot.x - knot.x > 1) {
      knot.x++;
    //prevKnot is two or more to the left
    } else if (knot.x - prevKnot.x > 1) {
      knot.x--;
    }
    // knots are on the same column
  } else if (prevKnot.x === knot.x) {
    //prevKnot is two or more upwards
    if (prevKnot.y - knot.y > 1) {
      knot.y++;
    //prevKnot is two or more downwards
    } else if (knot.y - prevKnot.y > 1) {
      knot.y--;
    }
  } else if (Math.abs(knot.y - prevKnot.y) > 1 || Math.abs(knot.x - prevKnot.x) > 1){
    if (prevKnot.x > knot.x) {
      knot.x++;
    } else {
      knot.x--;
    }
    if (prevKnot.y > knot.y) {
      knot.y++;
    } else {
      knot.y--;
    }
  }
}

function moveHead(command, head) {
  switch(command) {
    case commandTypes.LEFT: {
      head.x--;
      break;
    }
    case commandTypes.UP: {
      head.y++;
      break;
    }
    case commandTypes.RIGHT: {
      head.x++;
      break;
    }
    case commandTypes.DOWN: {
      head.y--;
      break;
    }
  }
}

function parseCommands(input) {
  return input
    .split(/\n/)
    .map(line => line.split(/\s/))
}

run({
  part1: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
