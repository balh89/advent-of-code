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

function findPacketsInRightOrder(packets) {
  return packets.reduce(determineIfPairIsInRightOrder, [])
}

function determineIfPairIsInRightOrder(rightOrderPackets, packetPair, packetIndex) {
  const [left, right] = packetPair;
  const longestPacket = Math.max(left.length, right.length);
  let leftValue;
  let rightValue;
  let leftValueIsInteger;
  let rightValueIsInteger;

  for (let i = 0; i < longestPacket; i++) {
    leftValue = left[i];
    rightValue = right[i];
    leftValueIsInteger = typeof leftValue === "number";
    rightValueIsInteger = typeof rightValue === "number";

    if (leftValue === undefined) {
      rightOrderPackets.push(packetIndex)
      break;
    } else if (rightValue === undefined) {
      break;
    } else if (leftValueIsInteger && rightValueIsInteger) {
      if (leftValue < rightValue) {
        rightOrderPackets.push(packetIndex)
        break;
      }
    } else if (leftValueIsInteger && !rightValueIsInteger) {
      rightOrderPackets = [Array.from(String(leftValue), Number), rightValue].reduce(determineIfPairIsInRightOrder, rightOrderPackets);
    } else if (!leftValueIsInteger && rightValueIsInteger) {
      rightOrderPackets = [leftValue, Array.from(String(rightValue), Number)].reduce(determineIfPairIsInRightOrder, rightOrderPackets);
    } else if (!leftValueIsInteger && !rightValueIsInteger) {
      rightOrderPackets = [leftValue, rightValue].reduce(determineIfPairIsInRightOrder, rightOrderPackets);
    }
  }

  return rightOrderPackets;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

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
