const { readFileSync } = require("fs");
const inputPath = "../input.txt";


function simulateLanternFishExpansion() {
	const lanternFishInput = readFileSync(inputPath, { encoding: 'utf8' })
		.split(",")
		.map(Number);

	const lanternFishes = lanternFishInput.reduce((acc, age) => {
		const fishExists = acc.find(fish => fish.daysToReproduce === age);
		if (fishExists) {
			fishExists.count++;
		} else {
			acc.push(new LanternFish(age));
		}
		return acc;
	}, []);

	console.log(lanternFishes);
	for (let i = 0; i <256; i++) {
		const fishAges = lanternFishes.map(lanternFish => lanternFish.ageFish());
		const newFishes = fishAges
		.filter(fish => fish.age === -1)
		.reduce((acc, fish) => {
			acc += fish.count;
			return acc;
		}, 0)
		if (newFishes) {
			lanternFishes.push(new LanternFish(8, newFishes));
		}
	}

	console.log(lanternFishes);
	console.log(lanternFishes.reduce((acc, lanternFish) => {
		acc += lanternFish.getCount();
		return acc;
	}, 0));
}

class LanternFish {
	constructor(daysToReproduce, count = 1) {
		this.daysToReproduce = daysToReproduce || 8;
		this.count = count;
	}

	increaseCount() {
		this.count = this.count === 1 ? 2 : this.count * this.count;
	}

	getCount() {
		return this.count;
	}

	ageFish() {
		this.daysToReproduce = this.daysToReproduce - 1;
		if (this.daysToReproduce === -1) {
			this.daysToReproduce = 6;
			return { age: -1, count: this.count };
		}
		return this.daysToReproduce;
	}
}

simulateLanternFishExpansion();