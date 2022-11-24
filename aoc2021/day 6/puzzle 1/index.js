const { readFileSync } = require("fs");
const inputPath = "../input.txt";


function simulateLanternFishExpansion() {
	const lanternFishInput = readFileSync(inputPath, { encoding: 'utf8' })
		.split(",")
		.map(Number);
	const lanternFishes = lanternFishInput.map(age => new LanternFish(age))
	for (let i = 0; i < 80; i++) {
		const fishAges = lanternFishes.map(lanternFish => lanternFish.ageFish());
		const newFishes = fishAges
		.filter(age => age === -1)
		.map(() => new LanternFish())

		lanternFishes.push(...newFishes)
	}
	console.log(lanternFishes.length);
}

class LanternFish {
	constructor(daysToReproduce) {
		this.daysToReproduce = daysToReproduce || 8;
	}

	ageFish() {
		this.daysToReproduce = this.daysToReproduce - 1;
		if (this.daysToReproduce === -1) {
			this.daysToReproduce = 6;
			return -1;
		}
		return this.daysToReproduce;
	}
}

simulateLanternFishExpansion();