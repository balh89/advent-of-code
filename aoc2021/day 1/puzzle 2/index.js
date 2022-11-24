const { readFile } = require("fs").promises;
const inputPath = "../input.txt";

async function getIncreasingDepthMeasurementBySumsOfThree() {
	const measurements = await getMeasurementInput();
	const measurementsSummedByRangeofThree = sumByThree(measurements);
	const countOfDepthIncreases = measurementsSummedByRangeofThree.reduce(depthCountReducer, 0)
	console.log(countOfDepthIncreases);

	function sumByThree(measurements) {
		return measurements
			.map((measurement, index, array) => {
				const nextMeasurement = array[index + 1];
				const secondNextMeasuremnt = array[index + 2];
				if (nextMeasurement == undefined || secondNextMeasuremnt == undefined) {
					return;
				}
				return measurement + nextMeasurement + secondNextMeasuremnt;
			})
			.filter(sum => sum !== undefined)
	}

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

async function getMeasurementInput() {
	const measurements = await readFile(inputPath, { encoding: 'utf8' });
	return measurements
		.toString()
		.split("\n")
		.map(Number)
}

getIncreasingDepthMeasurementBySumsOfThree()