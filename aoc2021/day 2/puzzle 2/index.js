const { readFile } = require("fs").promises;
const inputPath = "../input.txt";

const COMMAND_TYPES = {
	FORWARD: "forward",
	DOWN: "down",
	UP: "up"
};

return getCommands()
	.then(formatCommands)
	.then(followCommands)
	.then(calculateResult)

async function getCommands() {
	const commands = await readFile(inputPath, { encoding: 'utf8' });
	return commands
		.toString()
		.split("\n")
}

function formatCommands(commands) {
	return commands.map(rawCommand => {
		let [command, unit] = rawCommand.split(" ");
		unit = unit.replace(/\r?/g, "");
		return { command, unit: Number(unit) }
	})
}

function followCommands(commands) {
	return commands.reduce((acc, { command, unit }) => {
		switch(command) {
			case COMMAND_TYPES.FORWARD: {
				acc.horizontalPosition += unit;
				acc.depth += acc.aim * unit;
				break;
			}
			case COMMAND_TYPES.UP: {
				acc.aim -= unit;
				break;
			}
			case COMMAND_TYPES.DOWN: {
				acc.aim += unit;
				break;
			}
		}
		return acc;
	}, { horizontalPosition: 0, depth: 0, aim: 0 })
}

function calculateResult({ horizontalPosition, depth }) {
	const result = horizontalPosition * depth;
	console.log(result);
}