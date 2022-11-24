const { readFileSync } = require("fs");
const inputPath = "../input.txt";
const DIGITS = {
	ONE: 1,
	TWO: 2,
	THREE: 3,
	FOUR: 4,
	FIVE: 5,
	SIX: 6,
	SEVEN: 7,
	EIGHT: 8
};

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
	.split("\r\n")
	.reduce((acc, signalPattern) => {
		const [input, output] = signalPattern.split(" | ")
		acc.inputs.push(input.split(" "));
		acc.outputs.push(output.split(" "));
		return acc;
	}, { inputs: [], outputs: []})
}

function interpretDisplays() {
	const { inputs, outputs } = getInput();
	const result = decipherOutputs(outputs)
	console.log(result);
}

function decipherOutputs(outputs) {
	console.log(outputs);
	const result = outputs.reduce((acc, output) => {
		output.forEach(pattern => {
			const uniqueChars = new Set(pattern).size;
			console.log(uniqueChars);
			switch(uniqueChars) {
				case DIGITS.TWO: {
					acc[DIGITS.ONE]++;
					break;
				}
				case DIGITS.THREE: {
					acc[DIGITS.SEVEN]++;
					break;
				}
				case DIGITS.FOUR: {
					acc[DIGITS.FOUR]++;
					break;
				}
				case DIGITS.SEVEN: {
					acc[DIGITS.EIGHT]++;
					break;
				}
			}
		})
		return acc;
	}, { 1: 0, 4: 0, 7: 0, 8: 0})
	console.log(result);
	return Object.values(result).reduce((sum, digit)=> {
		sum += digit;
		return sum;
	}, 0)
}

interpretDisplays();