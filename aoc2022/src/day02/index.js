import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/);
  return input.reduce((totalScore, game) => {
    const [opponent, player] = game.split(/\s/)
    const decryptedPlayerMove = decryptPlayerMove(player);
    const shapePoints = getShapePoints(decryptedPlayerMove);
    const outcomePoints = getOutcomePoints(opponent, decryptedPlayerMove);
    totalScore += (shapePoints + outcomePoints);
    return totalScore;
  }, 0)

  function decryptPlayerMove(move) {
    switch(move) {
      case "X":
        return "A";
      case "Y":
        return "B";
      case "Z":
        return "C";
    }
  }
};

const part2 = (rawInput) => {
  const outcomeMap = {
    "X": "lose",
    "Y": "draw",
    "Z": "win"
  }

  const moveMap = {
    "A": {
      win: "B",
      draw: "A",
      lose: "C"
    },
    "B": {
      win: "C",
      draw: "B",
      lose: "A"
    },
    "C": {
      win: "A",
      draw: "C",
      lose: "B"
    }
  }

  const input = parseInput(rawInput).split(/\n/);
  return input.reduce((totalScore, game) => {
    const [opponent, encryptedOutcome] = game.split(/\s/)
    const decryptedOutcome = outcomeMap[encryptedOutcome];
    const moveToGetOutcome = getMoveToGetOutcome(opponent, decryptedOutcome);
    const shapePoints = getShapePoints(moveToGetOutcome);
    const outcomePoints = getOutcomePoints(opponent, moveToGetOutcome);
    totalScore += (shapePoints + outcomePoints);
    return totalScore;
  }, 0)

  function getMoveToGetOutcome(opponent, outcome) {
    return moveMap[opponent][outcome];
  }
};

const getShapePoints = move => {
  switch(move) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
  }
}

const shapeDefeatsMap = {
  "A": "C",
  "B": "A",
  "C": "B"
}

const getOutcomePoints = (opponent, me) => {
  if (opponent === me) {
    return 3;
  }
  if (shapeDefeatsMap[me] === opponent) {
    return 6;
  }
  return 0;
}

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
