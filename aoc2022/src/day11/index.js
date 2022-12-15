import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const monkeys = createMonkeys(input);
  const keepAwayGameInstance = new KeepAway(monkeys);
  for (let i = 0; i < 20; i++) {
    keepAwayGameInstance.playRound();
  }
  return keepAwayGameInstance.getMonkeyBusinessLevel();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const monkeys = createMonkeys(input);
  const commonMultiple = monkeys.reduce((acc, monkey) => {
    return acc *= monkey.divisibleBy;
  }, 1)
  const keepAwayGameInstance = new KeepAway(monkeys, commonMultiple);
  for (let i = 0; i < 10000; i++) {
    keepAwayGameInstance.playRound();
  }
  return keepAwayGameInstance.getMonkeyBusinessLevel();
};

function createMonkeys(input) {
  return input
    .split(/\n\n/)
    .map(monkey => {
      let [_, worryLevels, operation, divisibleBy, ifTrue, ifFalse] = monkey.split(/\n/);
      worryLevels = worryLevels.split(/:\s/)[1].split(", ").map(char => +char);
      operation = operation.split(/new\s=\s/)[1];
      divisibleBy = +divisibleBy.split(/by\s/)[1];
      ifTrue = +ifTrue.split(/monkey\s/)[1];
      ifFalse = +ifFalse.split(/monkey\s/)[1];
      return new Monkey(worryLevels, operation, divisibleBy, ifTrue, ifFalse)
    })
}

class Monkey {
  constructor(worryLevels, operation, divisibleBy, ifTrue, ifFalse) {
    this.worryLevels = worryLevels;
    this.operation = operation;
    this.divisibleBy = divisibleBy;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
    this._inspectCount = 0;
  }

  inspectItem() {
    let worryLevel = this.worryLevels.shift();
    if (worryLevel !== undefined) {
      worryLevel = this.#increaseWorryLevel(worryLevel);
      this._inspectCount++;
    }

    return worryLevel;
  }

  addItem(item) {
    this.worryLevels.push(item)
  }

  #increaseWorryLevel(old) {
    return eval(this.operation);
  }

  getPlayerToThrowTo(worryLevel) {
    if (worryLevel % this.divisibleBy === 0) {
      return this.ifTrue
    } else {
      return this.ifFalse;
    }
  }

  get inspectCount() {
    return this._inspectCount;
  }
}

class KeepAway {
  constructor(players, commonMultiple) {
    this.players = players;
    this.commonMultiple = commonMultiple;
  }

  playRound() {
    this.players.forEach(player => {
      let worryLevel;
      while ((worryLevel = player.inspectItem()) !== undefined) {
        worryLevel = this.#decreaseWorryLevel(worryLevel);
        const playerToThrowTo = player.getPlayerToThrowTo(worryLevel);
        this.#throwItem(playerToThrowTo, worryLevel);
      }
    })
  }

  #decreaseWorryLevel(old) {
    if (!this.commonMultiple) {
      return Math.floor(old / 3);
    } else {
      return old % this.commonMultiple;
    }
  }

  #throwItem(player, worryLevel) {
    this.players[player].addItem(worryLevel);
  }

  getMonkeyBusinessLevel() {
    return this.players
      .sort((a, b) => b.inspectCount - a.inspectCount)
      .slice(0, 2)
      .reduce((sum, player) => {
        return sum *= player.inspectCount;
      }, 1)
  }
}

run({
  part1: {
    tests: [
      {
        input: `
        Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
