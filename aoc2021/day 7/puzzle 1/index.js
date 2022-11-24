const { readFileSync } = require("fs");
const inputPath = "../input.txt";

function calculateCrabHorizontalPositions() {
	const startPositions = getInput();
	const medianPosition = getMedian(startPositions);
	const fuelCost = calculateFuelCost(startPositions, medianPosition);
	console.log(fuelCost);
}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
	.split(",")
	.map(Number);
}

function calculateFuelCost(startPositions, medianPosition) {
	return startPositions.reduce((fuelCost, startPosition) => {
		const distance = Math.abs(medianPosition - startPosition);
		fuelCost += distance;
		return fuelCost;
	}, 0)
}

function getMedian(input) {
	const sortedArray = input
		.slice()
		.sort((a, b) => a - b)
	return sortedArray[[Math.floor(sortedArray.length / 2)]]
}

calculateCrabHorizontalPositions();