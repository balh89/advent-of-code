const { readFileSync } = require("fs");
const inputPath = "../input.txt";

function dumboOctopusFactory(dumboOctopuses) {
	return dumboOctopuses.map((row, y) => {
		return row.map((dumboOctopus, x) => new DumboOctopus(dumboOctopus, x, y))
	})
}

class DumboOctopus {
	constructor(energyLevel, x , y) {
		this.energyLevel = energyLevel;
		this.hasFlashed = false;
		this.flashCount = 0;
		this.x = x;
		this.y = y;
	}

	flash() {
		this.setHasFlashed()
		this.increaseFlashCount();
	}

	increaseFlashCount() {
		this.flashCount++;
	}

	increaseEnergyLevel() {
		this.energyLevel++;
	}

	setHasFlashed() {
		this.hasFlashed = true;
	}

	resetHasFlashed() {
		this.hasFlashed = false;
	}

	getHasFlashed() {
		return this.hasFlashed;
	}

	resetEnergyLevel() {
		this.energyLevel = 0;
	}

	getEnergyLevel() {
		return this.energyLevel;
	}

	getFlashCount() {
		return this.flashCount;
	}

	getNeighbours(matrix) {
		const y = this.y;
		const x = this.x;
		return [
			{ y: y - 1, x, neighbour: getNeighbour(matrix, y - 1 , x) },
			{ y: y - 1, x: x + 1, neighbour: getNeighbour(matrix, y - 1, x + 1), },
			{ y, x: x + 1, neighbour: getNeighbour(matrix, y , x + 1) },
			{ y: y + 1, x: x + 1, neighbour: getNeighbour(matrix, y + 1 , x + 1) },
			{ y: y + 1, x, neighbour: getNeighbour(matrix, y + 1 , x) },
			{ y: y + 1, x: x - 1, neighbour: getNeighbour(matrix, y + 1, x - 1 ) },
			{ y, x: x - 1, neighbour: getNeighbour(matrix, y , x - 1) },
			{ y: y - 1, x: x - 1, neighbour: getNeighbour(matrix, y - 1, x - 1) }
		]

		function getNeighbour(matrix, y , x) {
			if (matrix[y]) {
				if (matrix[y][x] !== undefined) {
					return matrix[y][x];
				}
			}
			return null;
		}
	}

}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
		.map(row => {
			return row
				.split("")
				.map(Number)
		})
}

function totalDumboOctopusFlashes() {
	const input = getInput();
	const dumboOctopuses = dumboOctopusFactory(input);
	const result = simulate100Steps(dumboOctopuses);
	const flashCount = getFlashCount(result);
	console.log(flashCount);
}

function getFlashCount(dumboOctopuses) {
	return dumboOctopuses.reduce((sum, row) => {
		sum += row.reduce((rSum, dumboOctopus) => {
			rSum += dumboOctopus.getFlashCount();
			return rSum;
		}, 0)
		return sum;
	}, 0)
}

function simulate100Steps(dumboOctopuses) {
	let step = 0
	for (let i = 0; i < 500; i++) {
		step = i;
		resetDumboOctopuses(dumboOctopuses)
		increaseEnergyLevelOfDumboOctopuses(dumboOctopuses)
		for (let y = 0; y < dumboOctopuses.length; y++) {
			for (let x = 0; x < dumboOctopuses[y].length; x++) {
				checkOctopusForFlashingLevel(dumboOctopuses[y][x]);
			}
		}
	}
	return dumboOctopuses;

	function checkOctopusForFlashingLevel(octopus) {
		if (octopus.getEnergyLevel() > 9 && !octopus.getHasFlashed()) {
			octopus.flash()
			if(checkIfAllHasFlashed(dumboOctopuses)) {
				console.log("||||||||||||||||||||||||||||||||||||");
				console.log("STEP ", step + 1);
				console.log("|||||||||||||||||||||||||||||||||||||");
			}
			const neighbours = dumboOctopuses[octopus.y][octopus.x].getNeighbours(dumboOctopuses);
			neighbours
			.filter(neighbour =>  neighbour.neighbour)
			.forEach(({ neighbour }) => {
				neighbour.increaseEnergyLevel();
				checkOctopusForFlashingLevel(neighbour);
			})
		}
	}

	function checkIfAllHasFlashed(dumboOctopuses) {
		return dumboOctopuses.every(row => {
			return row.every(dumboOctopus => dumboOctopus.getHasFlashed())
		})
	}

	function increaseEnergyLevelOfDumboOctopuses(dumboOctopuses) {
		for (let y = 0; y < dumboOctopuses.length; y++) {
			for (let x = 0; x < dumboOctopuses[y].length; x++) {
				dumboOctopuses[y][x].increaseEnergyLevel();
			}
		}
	}
	function resetDumboOctopuses(dumboOctopuses) {
		for (let y = 0; y < dumboOctopuses.length; y++) {
			for (let x = 0; x < dumboOctopuses[y].length; x++) {
				if (dumboOctopuses[y][x].getHasFlashed()) {
					dumboOctopuses[y][x].resetEnergyLevel();
					dumboOctopuses[y][x].resetHasFlashed();
				}
			}
		}
	}
}


totalDumboOctopusFlashes();