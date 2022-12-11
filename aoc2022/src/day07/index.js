import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const commands = {
  CD: "cd",
  LS: "ls"
}

const nodeTypes = {
  DIR: "dir",
  FILE: "file"
}
const DISK_SPACE = 70000000;
const UNUSED_SPACE_NEEDED_FOR_UPDATE = 30000000;
const BACK = "..";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const fileSystem = parseTerminalOutput(input.split(/\n/));
  return fileSystem.tree.getTotalSizeOfDirectoriesWithSizeUnderN(100000);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const fileSystem = parseTerminalOutput(input.split(/\n/));
  const directories = fileSystem.tree.getSizeOfAllDirectories();
  const freeSpace = DISK_SPACE - directories["/"];
  return Object.values(directories)
    .sort((a, b) => a - b)
    .find(dirSize => {
      return (freeSpace + dirSize) >= UNUSED_SPACE_NEEDED_FOR_UPDATE
    } )

};

function parseTerminalOutput(terminalOutput) {
  return terminalOutput.reduce((acc, output) => {
    // output is of type command
    if (isOutputACommand(output)) {
      executeCommand(acc, output);
    } else if (acc.lastCommand === commands.LS) {
      if (output.startsWith(nodeTypes.DIR)) {
        const [_, name] = output.split(/\s/);
        acc.tree.addDirectoryNode(acc.path, name)
      } else {
        const [size, name] = output.split(/\s/);
        acc.tree.addFileNode(acc.path, name, size)
      }
    }
    return acc
  }, { path: [], lastCommand: null, tree: new Tree() })
}


function isOutputACommand(output) {
  return output.startsWith("$");
}

function executeCommand(acc, output) {
  const [_, command, value] = output.split(/\s/);

  switch(command) {
    case commands.CD: {
      acc.lastCommand = commands.CD;
      if (value === BACK) {
        acc.path.pop();

      } else {
        acc.path.push(value);
      }
      break;
    }
    case commands.LS: {
      acc.lastCommand = commands.LS;
      break;
    }
  }
}


class Tree {
  constructor() {
    this.nodes = {};
    this.addDirectoryNode(["/"], "/");
  }

  getTotalSizeOfDirectoriesWithSizeUnderN(maxDirSize, startNode = this.rootNode) {
    let totalSize = 0;
    const dirTotalSize = startNode.getTotalSize();
    if (dirTotalSize <= maxDirSize) {
      totalSize += dirTotalSize;
    }

    Object.values(startNode.children)
      .filter(node => node.type === nodeTypes.DIR)
      .forEach(node => {
      totalSize += this.getTotalSizeOfDirectoriesWithSizeUnderN(maxDirSize, node);
    })
    return totalSize;
  }

  getSizeOfAllDirectories(startNode = this.rootNode, directories = {}) {
    directories[(startNode.path.join("/") + startNode.name).replace("//", "/")] = startNode.getTotalSize();
    Object.values(startNode.children)
      .filter(node => node.type === nodeTypes.DIR)
      .forEach(node => {
        return Object.assign(directories, this.getSizeOfAllDirectories(node, directories))
    })
    return directories;
  }

  get rootNode() {
    return this.nodes["/"];
  }

  addDirectoryNode(path, name) {
    const parentNode = this.#getParentNode(path);
    const node = new Directory(path, name);
    if (parentNode) {
      parentNode.children[name] = node;
    } else {
      this.nodes[path.join("/").replace("//", "/")] = node;
    }
  }

  addFileNode(path, name, size) {
    const parentNode = this.#getParentNode(path);
    const node = new File(nodeTypes.FILE, path, name, size);
    parentNode.children[name] = node;
    parentNode.size += +size;
  }

  #getParentNode(path) {
    // return root node;
    if (path.length === 1) {
      return this.rootNode;
    }
    return path.slice(1).reduce((node, folder) => {
      return node.children[folder];
    }, this.rootNode);
  }
}

class TreeNode {
  constructor(type, path, name, size) {
    this.name = name;
    this.type = type;
    this.path = path.slice();
    this.size = +size
    this.children = {};
  }
}

class Directory extends TreeNode {
  constructor(path, name) {
    super(nodeTypes.DIR, path, name, 0);
  }

  getTotalSize() {
    let totalSize = this.size;
    Object.values(this.children)
      .filter(node => node.type === nodeTypes.DIR)
      .forEach(directory => {
        totalSize += directory.getTotalSize();
      })
    return totalSize;
  }
}

class File extends TreeNode {
  constructor(path, name, size) {
    super(nodeTypes.File, path, name, size);
  }
}


run({
  part1: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k`,
        expected: 95437
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k`,
        expected: 24933642
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
