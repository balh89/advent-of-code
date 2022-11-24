const { readFileSync } = require("fs");
const inputPath = "../input.txt";
const { PerformanceObserver, performance } = require('perf_hooks');
let t1, t2
function calculateCrabHorizontalPositions() {
	t1 = performance.now();
	const startPositions = getInput();
	const sortedPositions = sort(startPositions);
	const fuelCosts = calculateFuelCostForAllPositions(sortedPositions);
	console.log(fuelCosts);
	const lowestFuelCost = fuelCosts.sort((a, b) => a.fuelCost - b.fuelCost)[0];
	console.log(lowestFuelCost);
	t2 = performance.now();
	console.log(t2 -t1);
}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
	.split(",")
	.map(Number);
}

function calculateFuelCostForAllPositions(sortedStartPositions) {
	return Array.from({ length: sortedStartPositions.length + 1}, (_, i) => i).reduce((fuelCost, startPosition) => {
		const fuelCostForPosition = sortedStartPositions
		.reduce((positionFuelCost, position) => {
			const distance = Math.abs(position - startPosition);
			for (let i = 1; i <= distance; i++) {
				positionFuelCost += i;
			}
				return positionFuelCost;
		}, 0)
		fuelCost.push({ fuelCost: fuelCostForPosition, position: startPosition });
		return fuelCost;
	}, [])
}

function sort(input) {
	return input
		.slice()
		.sort((a, b) => a - b)
}

calculateCrabHorizontalPositions();