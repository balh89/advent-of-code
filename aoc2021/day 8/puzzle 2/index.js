const { readFileSync } = require("fs");
const inputPath = "../input.txt";
const DIGITS = {
	ZERO: 0,
	ONE: 1,
	TWO: 2,
	THREE: 3,
	FOUR: 4,
	FIVE: 5,
	SIX: 6,
	SEVEN: 7,
	EIGHT: 8,
	NINE: 9
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
	const decipheredInputs = decipherInputs(inputs);
	const results = decipherOutputs(decipheredInputs, outputs);
	console.log(results);
}

function decipherOutputs(decipheredInputs, outputs) {
	return outputs.reduce((sum, output, i) => {
		sum += +output.reduce((oSum, x) => {
			const index = Object.values(decipheredInputs[i]).findIndex(({ set }) => {
				return isSetsEqual(set, new Set(x))
			})
			oSum += Object.keys(decipheredInputs[i])[index];
			return oSum;
		}, "")
		return sum;
	}, 0)
}


function decipherInputs(inputs) {
	const ciphers = {};
	inputs.forEach((input, index) => {
		ciphers[index] = {};
		const charCountMap = getCharCountMap(input);
		ciphers[index][DIGITS.ONE] = charCountMap[DIGITS.TWO][0];
		ciphers[index][DIGITS.FOUR] = charCountMap[DIGITS.FOUR][0];
		ciphers[index][DIGITS.SEVEN] = charCountMap[DIGITS.THREE][0];
		ciphers[index][DIGITS.EIGHT] = charCountMap[DIGITS.SEVEN][0];
		ciphers[index][DIGITS.SIX] = charCountMap[DIGITS.SIX].find(x => {
			return !charCountMap[DIGITS.TWO][0].pattern.split("").every(char => {
				return x.set.has(char);
			})
		})
		const topRight = difference(ciphers[index][DIGITS.FOUR].set, ciphers[index][DIGITS.SIX].set).values().next().value
		const bottomRight = [...ciphers[index][DIGITS.ONE].set].find(x => x !== topRight);;
		ciphers[index][DIGITS.THREE] = charCountMap[DIGITS.FIVE].find(x => {
			return x.pattern.includes(topRight) && x.pattern.includes(bottomRight);
		})
		ciphers[index][DIGITS.FIVE] = charCountMap[DIGITS.FIVE].find(x => {
			return x.pattern.includes(bottomRight) && !x.pattern.includes(topRight);
		})
		ciphers[index][DIGITS.TWO] = charCountMap[DIGITS.FIVE].find(x => {
			return !x.pattern.includes(bottomRight) && x.pattern.includes(topRight);
		})

		ciphers[index][DIGITS.NINE] = charCountMap[DIGITS.SIX].find(x => {
			const foo = intersection(ciphers[index][DIGITS.FOUR].set, x.set);
			return isSetsEqual(foo, ciphers[index][DIGITS.FOUR].set);
		})
		ciphers[index][DIGITS.ZERO] = charCountMap[DIGITS.SIX].find(x => {
			return x.pattern !== ciphers[index][DIGITS.NINE].pattern && x.pattern !== ciphers[index][DIGITS.SIX].pattern;
		})
	})
	return ciphers;

	function getCharCountMap(input) {
		return input.reduce((map, pattern) => {
			const uniqueChars = new Set(pattern)
			const charCount = uniqueChars.size;
			map[charCount] = map[charCount] || [];
			map[charCount].push({ set: uniqueChars, count: charCount, pattern });
			return map
		}, {})
	}

	function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
	}

	function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
	}


}
function isSetsEqual(setA, setB) {
	if (setA.size !== setB.size) {
		return false;
	}
	for (let a of setA) {
		if (!setB.has(a)) {
			return false;
		}
	}
	return true;
}

interpretDisplays();