const { readFile } = require("fs").promises;
const inputPath = "../input.txt";

function getIncreasingDepthMeasurements() {
	return getIncreasingDepthCount(depthCountReducer);

	function depthCountReducer(count, measurement, index, array) {
		if (!index) {
			return count;
		}
		const previousMeasurement = array[index - 1];
		if (measurement > previousMeasurement) {
			count++;
		}
		return count;
	}
}

async function getIncreasingDepthCount(reducer) {
	const measurement = await getMeasurementInput();
	const countOfDepthIncreases = measurement.reduce(reducer, 0)
	console.log(countOfDepthIncreases);
}

async function getMeasurementInput() {
	const measurements = await readFile(inputPath, { encoding: 'utf8' });
	return measurements
		.toString()
		.split("\n")
		.map(Number)
}

getIncreasingDepthMeasurements();

