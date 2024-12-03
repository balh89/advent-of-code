import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",");

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  .map(x => x.split(""));
  return input
    .map(getHash)
    .reduce((sum, hash) => {
      return sum += hash;
    }, 0)
};

function getHash(input) {
  return input.reduce((hash, char) => {
    const ascii = char.charCodeAt(0);
    hash += ascii;
    hash *= 17;
    hash = hash % 256;
    return hash;
  }, 0)
}

const part2 = (rawInput) => {
  const inputs = parseInput(rawInput);
  const boxes = inputs.reduce((hashmap, input) => {
    performAction(input, hashmap)
    return hashmap
  }, new Map())

  return Array.from(boxes).reduce((sumFocusingPower, [box, slots]) => {
    const boxNumber = box + 1;
    let slotNumber = 1;
    slots.forEach((focalLength, key) => {
      sumFocusingPower += boxNumber * slotNumber * +focalLength;
      slotNumber++;
    })
    return sumFocusingPower;
  }, 0)

  function performAction(input, hashmap) {
    const [label, action, value] = input.split(/([\=\-])/)
    const hash = getHash(label.split(""))
    if (!hashmap.has(hash)) {
      hashmap.set(hash, new Map());
    }

    const box = hashmap.get(hash);

    if (action === "=") {
      if (box.has(label)) {
        box.set(label, value);
      } else {
        box.set(label, value)
      }
    } else if (action === "-") {
      box.delete(label);
    } else {
      throw new Error("WRONG ACTION")
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
