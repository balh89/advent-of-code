const { readFileSync } = require("fs");
const inputPath = "../input.txt";

const ARROW = " -> ";

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
}


function findOptimalPolymerFormula() {
	const input = getInput();
	const { template, rules } = formatInput(input);
	const result = performSteps(template, rules);
	const { leastCommon, mostCommon } = getLeastAndMostCommonElement(result);
	console.log(mostCommon - leastCommon);

}

function getLeastAndMostCommonElement(input) {
	const foo = input.split("").reduce((acc, char) => {
		if (!acc[char]) {
			acc[char] = 1;
		} else {
			acc[char] = acc[char] + 1;
		}
		return acc;
	}, {})

	const bar = Object.values(foo);
	return { leastCommon: Math.min(...bar), mostCommon: Math.max(...bar) };
	// return Object.entries(foo).reduce((acc, [key, value]) => {
	// 	if (value > acc.mostCommon.count) {
	// 		acc.mostCommon.count = value;
	// 		acc.mostCommon.char = key;
	// 	}
	// 	if (value < acc.leastCommon.count) {
	// 		acc.leastCommon.count = value;
	// 		acc.leastCommon.char = key;
	// 	}
	// 	return acc;
	// }, { leastCommon: { char: "", count: 0 }, mostCommon: { char: "", count: 0 } })
}

function performSteps(template, rules) {
	for (let i = 0;i < 40; i++) {
		console.log("step: ", i);
		const templateCopy = template;
		const actionsToPerform = [];
		rules.forEach(rule => {
			let index = 0;
			let first = true
			while(index !== -1) {
				index = templateCopy.indexOf(rule.A, first ? 0 : index + 1);
				first = false;
				if (index !== -1) {
					actionsToPerform.push({ index: index + 1, char: rule.B });
				}
			}
		})
		let indexOffset = {}
		template = actionsToPerform.reduce((template, action) => {
			const offset = Object.entries(indexOffset).reduce((sum, [key, value]) => {
				if (key <= action.index) {
					sum += value;
				}
				return sum;
			}, 0)
			template = template.slice(0, action.index + offset) + action.char + template.slice(action.index + offset);
			indexOffset[action.index] = indexOffset[action.index] + 1 || 1;
			return template;
		}, template)
	}
	return template;
}

function formatInput(input) {
	return input.reduce((acc, line) => {
		if (!line) {
			return acc;
		}
		if (line.includes(ARROW)) {
			const [A, B] = line.split(ARROW);
			acc.rules.push({ A, B })
		} else {
			acc.template = line;
		}
		return acc;
	}, { template: "", rules: [] })
}

findOptimalPolymerFormula();