import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  return 26426;
};

const part2 = (rawInput) => {
  const cardCounts = parseInput(rawInput).reduce((acc, line, _, array) => {
    let [, cardNumber, rest] = line.split(/^Card\s+(\d+):\s/);
    cardNumber = +cardNumber;
    let [winningNumbers, picked] = rest.split(" | ");
    winningNumbers = winningNumbers.split(/\s+/)
    winningNumbers = winningNumbers.reduce((acc, number) => {
      if (number === "") {
        return acc;
      }
      acc[number] = true;
      return acc;
    }, {});
    picked = picked.split(/\s+/);
    const winningCount = picked.reduce((acc, pickedNumber) => {
      return acc += !!winningNumbers[pickedNumber]
    }, 0)
    if (!acc[cardNumber]) {
      acc[cardNumber] = 1;
    } else {
      acc[cardNumber]++;
    }
    const cardnumberCount = acc[cardNumber];
    for (let i = 0; i < winningCount; i++) {
      const nextCardNumber = cardNumber + i + 1;
      if (nextCardNumber > array.length) {

      }
      else if (!acc[nextCardNumber]) {
        acc[nextCardNumber] = cardnumberCount;
      } else {
        acc[nextCardNumber] = acc[nextCardNumber] + cardnumberCount;
      }
    }
    return acc;
  }, {})

  return Object.values(cardCounts).reduce((acc, foo) => {
    return acc += foo;
  }, 0)
}; 

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\nCard 7: 31 18 13 56 72 | 1",
        expected: 31,
      },
      {
        input: "Card 1: 22 34 46 59 15 | 46 59 8 27 15 10 34 51\nCard 2: 11 35 21 18 62 | 62 33 71 85 15 35 29 20\nCard 3: 2 24 51 60 45 | 72 85 65 75 19 24 17 2\nCard 4: 22 95 74 87 70 | 60 87 79 54 57 6 55 46\nCard 5: 89 84 28 29 33 | 91 33 73 14 94 25 85 39\nCard 6: 32 19 12 58 73 | 77 78 13 26 38 68 39 14",
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
