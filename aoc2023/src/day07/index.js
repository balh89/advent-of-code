import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(x => x.split(/\s/));



const part1 = (rawInput) => {
  const handMap = {
    fiveOfAKind: counts => counts.length === 1,
    fourOfAKind: counts => counts.length === 2 && counts.some(x => x === 4),
    fullHouse: counts => counts.length === 2 && counts.some(x => x === 3),
    threeOfAKind: counts => counts.length === 3 && counts.some(x => x === 3),
    twoPairs: counts => {
      const sortedCounts = counts.slice().sort();
      return counts.length === 3 && sortedCounts[1] === 2 && sortedCounts[2] === 2;
    },
    onePair: counts => {
      const sortedCounts = counts.slice().sort();
      return counts.length === 4 && sortedCounts[3] === 2 && sortedCounts[1] === 1;
    },
    highCard: counts => {
      return counts.length === 5;
    }
  }
  
  const cardStrengthMap = {
    A: 1, K: 2, Q: 3, J: 4, T: 5, "9": 6, "8": 7, "7": 8, "6": 9, "5": 10, "4": 11, "3": 12, "2": 13
  }

  const input = parseInput(rawInput);
  input.sort(sortFoo)
  return input.reduce((totalWinnings, hand, index) => {
    const [, bid] = hand;
    return totalWinnings += bid * (index + 1);
  }, 0)

  function sortFoo(a, b) {
    let [aHand] = a;
    aHand = aHand.split("");
    let [bHand] = b;
    bHand = bHand.split("");
    const resolvedAHand = resolveHand(aHand);
    const resolvedBHand = resolveHand(bHand);
    if (resolvedAHand === resolvedBHand) {
      return resolveBySecondOrdering(aHand, bHand);
    }
    return resolvedAHand - resolvedBHand;
  }

  function resolveBySecondOrdering(aHand, bHand) {
    for (let i = 0; i < aHand.length; i++) {
      const a = aHand[i];
      const b = bHand[i];
      if (a === b) {
        continue;
      }

      return cardStrengthMap[b] - cardStrengthMap[a];
    }
  }

  function resolveHand(hand) {
    const cardCounts = countCards(hand);
    const resolvedHand = Object.entries(handMap).reduce((acc, [key, func]) => {
      if (acc !== -1) {
        return acc;
      }

      if (func(cardCounts)) {
        return key;
      }
      return acc;
    }, -1);
    switch(resolvedHand) {
      case "fiveOfAKind": {
        return 7;
      }
      case "fourOfAKind": {
        return 6;
      }
      case "fullHouse": {
        return 5;
      }
      case "threeOfAKind": {
        return 4;
      }
      case "twoPairs": {
        return 3;
      }
      case "onePair": {
        return 2;
      }
      case "highCard": {
        return 1;
      }
    }
  }

  function countCards(hand) {
    return Object.values(hand.reduce((acc, card) => {
      acc[card] ? acc[card]++ : acc[card] = 1;
      return acc;
    }, {}));
  }
};

const part2 = (rawInput) => {
  const handMap = {
    fiveOfAKind: counts => counts.length === 1,
    fourOfAKind: counts => counts.length === 2 && counts.some(x => x === 4),
    fullHouse: counts => counts.length === 2 && counts.some(x => x === 3),
    threeOfAKind: counts => counts.length === 3 && counts.some(x => x === 3),
    twoPairs: counts => {
      const sortedCounts = counts.slice().sort();
      return counts.length === 3 && sortedCounts[1] === 2 && sortedCounts[2] === 2;
    },
    onePair: counts => {
      const sortedCounts = counts.slice().sort();
      return counts.length === 4 && sortedCounts[3] === 2 && sortedCounts[1] === 1;
    },
    highCard: counts => {
      return counts.length === 5;
    }
  }
  
  const cardStrengthMap = {
    A: 1, K: 2, Q: 3, J: 999, T: 5, "9": 6, "8": 7, "7": 8, "6": 9, "5": 10, "4": 11, "3": 12, "2": 13
  }

  const input = parseInput(rawInput);
  input.sort(sortFoo)
  return input.reduce((totalWinnings, hand, index) => {
    const [, bid] = hand;
    return totalWinnings += +bid * (index + 1);
  }, 0)

  function sortFoo(a, b) {
    let [aHand] = a;
    aHand = aHand.split("");
    let [bHand] = b;
    bHand = bHand.split("");
    const resolvedAHand = resolveHand(aHand);
    const resolvedBHand = resolveHand(bHand);
    if (resolvedAHand === resolvedBHand) {
      return resolveBySecondOrdering(aHand, bHand);
    }
    return resolvedAHand - resolvedBHand;
  }

  function resolveBySecondOrdering(aHand, bHand) {
    for (let i = 0; i < aHand.length; i++) {
      const a = aHand[i];
      const b = bHand[i];
      if (a === b) {
        continue;
      }

      return cardStrengthMap[b] - cardStrengthMap[a];
    }
  }

  function resolveHand(hand) {
    const cardCounts = countCards(hand);
    const resolvedHand = Object.entries(handMap).reduce((acc, [key, func]) => {
      if (acc !== -1) {
        return acc;
      }

      let cardCountsCopy = JSON.parse(JSON.stringify(cardCounts));
      const Js = cardCountsCopy["J"] || 0;
      delete cardCountsCopy. J;
      cardCountsCopy = Object.values(cardCountsCopy);
      cardCountsCopy.sort();
      if (cardCountsCopy.length === 0) {
        cardCountsCopy.push(Js)
      } else {
        cardCountsCopy[cardCountsCopy.length - 1] = cardCountsCopy[cardCountsCopy.length - 1] + Js;
      }

      if (func(cardCountsCopy)) {
        return key;
      }
      return acc;
    }, -1);
    switch(resolvedHand) {
      case "fiveOfAKind": {
        return 7;
      }
      case "fourOfAKind": {
        return 6;
      }
      case "fullHouse": {
        return 5;
      }
      case "threeOfAKind": {
        return 4;
      }
      case "twoPairs": {
        return 3;
      }
      case "onePair": {
        return 2;
      }
      case "highCard": {
        return 1;
      }
    }
  }

  function countCards(hand) {
    return hand.reduce((acc, card) => {
      acc[card] ? acc[card]++ : acc[card] = 1;
      return acc;
    }, {});
  }
 
};

run({
  part1: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
        `,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        JJJJ8 619
        Q4J94 152
        77587 277
        7333J 651
        QQQQ2 419
        `,
        expected: 7305,
      },
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
        `,
        expected: 5905,
      },
      {
        input: `
        JKKK2 1
        QQQQ2 2
        `,
        expected: 5,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});