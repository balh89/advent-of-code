import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  .split(/\n\n/)
  .map(pair => {
    return pair
      .split(/\n/)
      .map(packet => JSON.parse(packet))
  });

  return findPacketsInRightOrder(input)
    .reduce((indexSum, pairIndex) => indexSum += pairIndex);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\n\n/g, "\n")
    .split("\n")
    .map(packet => JSON.parse(packet))
  const divider1 = [[2]];
  const divider2 = [[6]];
  return [...input, divider1, divider2].sort((a, b) => determineIfPairIsInRightOrder([a, b]) ? -1 : 1)
    .reduce((decoderKey, packet, index, array) => {
    if (packet === divider1 || packet === divider2) {
      decoderKey *= (index + 1);
    }
    return decoderKey;
  }, 1)
};

function findPacketsInRightOrder(packets) {
  const rightOrderPackets = [];
  for (let i = 0; i < packets.length; i++) {
    if (determineIfPairIsInRightOrder(packets[i])) {
      rightOrderPackets.push(i + 1);
    }
  }
  return rightOrderPackets;
}

function determineIfPairIsInRightOrder(packetPair) {
  const [left, right] = packetPair;
  const longestPacket = Math.max(left.length, right.length);
  let leftValue;
  let rightValue;
  let leftValueIsInteger;
  let rightValueIsInteger;
  let isRightOrder;

  for (let i = 0; i < longestPacket; i++) {
    leftValue = left[i];
    rightValue = right[i];
    leftValueIsInteger = typeof leftValue === "number";
    rightValueIsInteger = typeof rightValue === "number";

    if (leftValue === undefined) {
      isRightOrder = true;
    } else if (rightValue === undefined) {
      isRightOrder = false;
    } else if (leftValueIsInteger && rightValueIsInteger) {
      if (leftValue < rightValue) {
        isRightOrder = true;
      } else if (leftValue > rightValue) {
        isRightOrder = false;
      }
    } else if (leftValueIsInteger && !rightValueIsInteger) {
      isRightOrder = determineIfPairIsInRightOrder([[leftValue], rightValue]);
    } else if (!leftValueIsInteger && rightValueIsInteger) {
      isRightOrder = determineIfPairIsInRightOrder([leftValue, [rightValue]]);
    } else if (!leftValueIsInteger && !rightValueIsInteger) {
      isRightOrder = determineIfPairIsInRightOrder([leftValue, rightValue]);
    }
    if (isRightOrder !== undefined) {
      break;
    }
  }
  return isRightOrder;
}

run({
  part1: {
    tests: [
      {
        input: `
        [1,1,3,1,1]
        [1,1,5,1,1]
        
        [[1],[2,3,4]]
        [[1],4]
        
        [9]
        [[8,7,6]]
        
        [[4,4],4,4]
        [[4,4],4,4,4]
        
        [7,7,7,7]
        [7,7,7]
        
        []
        [3]
        
        [[[]]]
        [[]]
        
        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        [1,1,3,1,1]
        [1,1,5,1,1]
        
        [[1],[2,3,4]]
        [[1],4]
        
        [9]
        [[8,7,6]]
        
        [[4,4],4,4]
        [[4,4],4,4,4]
        
        [7,7,7,7]
        [7,7,7]
        
        []
        [3]
        
        [[[]]]
        [[]]
        
        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
