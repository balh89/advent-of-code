import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

class Game {
  constructor(input, maxRed, maxGreen, maxBlue) {
    this.colors = {
      red: "red",
      green: "green",
      blue: "blue"
    };
    this.gameId = "";
    this.sets = [];
    this.maxRed = maxRed;
    this.maxGreen = maxGreen;
    this.maxBlue = maxBlue;
    const [, gameId, sets] = input.split(/^(Game\s\d+:\s)/)
    this.setGameId(gameId);
    this.setSets(sets);
    this.setMaxCubes(this.colors.red, maxRed);
    this.setMaxCubes(this.colors.blue, maxBlue);
    this.setMaxCubes(this.colors.green, maxGreen);
  }

  setGameId(input) {
    this.gameId = +input.match(/^Game\s(\d+):\s/)[1];
  }

  setSets(input) {
    this.sets = input
      .split("; ")
      .map(set => set.split(", "))
      .map(set => new Set(set))
  }

  isValidGame() {
    return this.sets.every(set => {
      const isValid = (set.red || 0) <= this.maxRed && (set.green || 0) <= this.maxGreen && (set.blue || 0) <= this.maxBlue;
      return isValid;
    })
  }

  getGamePower() {
    return this.maxGreen * this.maxRed * this.maxBlue;
  }

  getId() {
    return this.gameId;
  }



  setMaxCubes(color, count) {
    if (count === undefined) {
      //get max from sets
      const counts = this.sets.map(set => set.getColorCount(color));
      count = Math.max(...counts)
    }

    this[`max${color.charAt(0).toUpperCase() + color.slice(1)}`] = count;
  }
}

class Set {
  constructor(set) {
  this.setDice(set);
  }

  setDice(set) {
    set.forEach(set => {
      const [count, color] = set.split(" ");
      this[color] = +count;
    })
  }

  getColorCount(color) {
    return this[color] || 0;
  }
}



const part1 = (rawInput) => {
  const games = parseInput(rawInput)
    .split("\n")
    .map(x => new Game(x, 12, 13, 14));
  
  return games.reduce((sumOfGameIds, game) => {
    if (game.isValidGame()) {
      sumOfGameIds += game.getId();
    }
    return sumOfGameIds;
  }, 0)
};

const part2 = (rawInput) => {
  const games = parseInput(rawInput)
    .split("\n")
    .map(x => new Game(x));
  
  return games.reduce((sumOfGameIds, game) => {
    sumOfGameIds += game.getGamePower();
    return sumOfGameIds;
  }, 0)
};

run({
  part1: {
    tests: [
      {
        input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
