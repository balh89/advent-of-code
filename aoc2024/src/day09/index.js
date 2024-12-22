import run from "aocrunner";

const FILE = "file";
const FREE_SPACE = "freeSpace";

const part1 = (rawInput) => {
  const disk = parseInput(rawInput);
  const files = disk.slice().filter((x) => x.type === FILE);

  let result = disk.map((entry, index) => {
    if (!files.length) {
      return [];
    }
    if (entry.type === FILE) {
      files.shift();
      return entry;
    }

    return processEntry(entry, files);
  });
  result = result.flat();
  const { checksum } = result.flat().reduce(
    (acc, entry) => {
      for (let i = 0; i < entry.blocks; i++) {
        const fileChecksum = acc.index * entry.id;
        acc.checksum += fileChecksum;
        acc.index++;
      }

      return acc;
    },
    { index: 0, checksum: 0 },
  );

  return checksum;
  function processEntry(entry, files) {
    const lastFile = files.at(-1);
    if (!lastFile) {
      return [];
    }

    if (entry.blocks === lastFile.blocks) {
      return { ...files.pop() };
    }

    if (entry.blocks < lastFile.blocks) {
      const newEntry = {
        type: FILE,
        id: lastFile.id,
        blocks: entry.blocks,
      };
      lastFile.blocks -= entry.blocks;

      return newEntry;
    }

    if (entry.blocks > lastFile.blocks) {
      const filesToAdd = [];
      let remainingBlocks = entry.blocks;
      while (remainingBlocks > 0 && files.length) {
        const file = { ...files.pop() };

        if (file.blocks <= remainingBlocks) {
          filesToAdd.push(file);
          remainingBlocks -= file.blocks;
        } else {
          filesToAdd.push({
            type: FILE,
            id: file.id,
            blocks: remainingBlocks,
          });
          file.blocks -= remainingBlocks;
          files.push(file);
          remainingBlocks = 0;
        }
      }

      return filesToAdd;
    }
  }
};

const part2 = (rawInput) => {
  const disk = parseInput(rawInput);
  const files = disk
    .slice()
    .filter((x) => x.type === FILE)
    .reverse();

  const result = files.reduce((acc, file) => {
    const fileIndex = acc.findIndex((_file) => _file.id === file.id);
    const emptySpaceThatHasBlocksIndex = acc.findIndex(
      ({ type, blocks }, index) =>
        type === FREE_SPACE && blocks >= file.blocks && index < fileIndex,
    );

    if (emptySpaceThatHasBlocksIndex === -1) {
      return acc;
    }

    const emptySpaceThatHasEnoughBlocks = acc[emptySpaceThatHasBlocksIndex];
    const currentFilePosition = acc.findIndex((_file) => _file.id === file.id);

    acc[currentFilePosition] = {
      type: FREE_SPACE,
      blocks: file.blocks,
    };
    if (file.blocks === emptySpaceThatHasEnoughBlocks.blocks) {
      acc.splice(emptySpaceThatHasBlocksIndex, 1);
    } else {
      emptySpaceThatHasEnoughBlocks.blocks =
        emptySpaceThatHasEnoughBlocks.blocks - file.blocks;
    }
    acc.splice(emptySpaceThatHasBlocksIndex, 0, file);
    return acc;
  }, disk);

  const { checksum } = result.reduce(
    (acc, entry) => {
      for (let i = 0; i < entry.blocks; i++) {
        if (entry.id === undefined) {
          acc.index++;
        } else {
          const fileChecksum = acc.index * entry.id;
          acc.checksum += fileChecksum;
          acc.index++;
        }
      }

      return acc;
    },
    { index: 0, checksum: 0 },
  );

  return checksum;
};

function parseInput(rawInput) {
  return rawInput.split("").reduce((acc, digit, index) => {
    if (index % 2 === 0) {
      acc.push(handleFile(digit, index));
    } else {
      const freeSpace = handleFreeSpace(digit, index);
      if (freeSpace) {
        acc.push(freeSpace);
      }
    }

    return acc;
  }, []);

  function handleFile(digit, index) {
    return {
      type: FILE,
      id: index === 0 ? 0 : index / 2,
      index,
      blocks: +digit,
    };
  }

  function handleFreeSpace(digit, index) {
    if (+digit === 0) {
      return;
    }

    return {
      type: FREE_SPACE,
      index,
      blocks: +digit,
    };
  }
}

run({
  part1: {
    tests: [
      {
        input: "2333133121414131402",
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "2333133121414131402",
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
