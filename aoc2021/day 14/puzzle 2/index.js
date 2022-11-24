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
	console.log(Math.round(mostCommon / 2) - Math.round(leastCommon / 2));

}

function getPairs(string) {
	return string.split("").reduce((acc, char, index, array) => {
		if (index >= array.length - 1) {
			return acc;
		}
		acc[char + array[index + 1]] = acc[char] + 1 || 1;
		return acc;
	}, {})
}

function getLeastAndMostCommonElement(input) {
	const foo = Object.entries(input).reduce((acc, [pair, value], index, array) => {
		const [first, last] = pair.split("");
			acc[first] = acc[first] + value || value;
			acc[last] = acc[last] + value || value;
		return acc;
	}, {})
	// console.log(foo);
	// console.log(Object.entries(foo).reduce((acc, [key, value]) => {
	// 	acc[key] = Math.round(value / 2);
	// 	return acc;
	// }, {}));
	return { leastCommon: Math.min(...Object.values(foo)), mostCommon: Math.max(...Object.values(foo)) };
}

function performSteps(template, rules) {
	let newTemplate = template;
	for (let i = 0; i < 40; i++) {
		const actionsToPerform = {};
		rules.forEach(rule => {
			if (newTemplate[rule.A]) {
				actionsToPerform[rule.A] = rule.B;
			}
		})

		newTemplate = Object.entries(newTemplate).reduce((acc, [key, value]) => {
				const [first, last] = key.split("");
				acc[first + actionsToPerform[key]] = acc[first + actionsToPerform[key]] + value || value;
				acc[actionsToPerform[key] + last] = acc[actionsToPerform[key] + last] + value || value;
			return acc;
		}, {})
	}
	return newTemplate;
}

// function performSteps(template, rules) {
// 	for (let i = 0; i < 3; i++) {
// 		console.log(template);
// 		const actionsToPerform = [];
// 		rules.forEach(rule => {
// 			if (template[rule.A]) {
// 				actionsToPerform.push(rule);
// 			}
// 		})

// 		actionsToPerform.forEach(action => {
// 			const [first, last] = action.A.split("");
// 			template[first + action.B] = template[first + action.B] + template[action.A] || 1;
// 			template[action.B + last] = template[action.B + last] + template[action.A] || 1;
// 			delete template[action.A];
// 		})
// 		// template = REEEEE;
// 		// usedTemplatePairs.forEach(pair => {
// 		// 	template[pair] = template[pair] + template[pair] || 1;
// 		// })
// 	}
// 	return template;
// }

function formatInput(input) {
	return input.reduce((acc, line) => {
		if (!line) {
			return acc;
		}
		if (line.includes(ARROW)) {
			const [A, B] = line.split(ARROW);
			acc.rules.push({ A, B })
		} else {
			acc.template = getPairs(line);
		}
		return acc;
	}, { template: "", rules: [] })
}

findOptimalPolymerFormula();