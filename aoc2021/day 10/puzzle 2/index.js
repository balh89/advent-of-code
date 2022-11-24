const { readFileSync } = require("fs");
const inputPath = "../input.txt";

const END_TAGS = {
	")": true,
	"}": true,
	"]": true,
	">": true
};
const CONNECTED_TAGS = {
	"(": ")",
	"{": "}",
	"[": "]",
	"<": ">"
}
const AUTO_COMPLETE_SCORE = {
	"(": 1,
	"[": 2,
	"{": 3,
	"<": 4
}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
}

function getAutoCompleteScore() {
	const input = getInput();
	const filterdLines = filterOutCorruptedLines(input)
	const score = autoCompleteLines(filterdLines)
	console.log(score);
}

function autoCompleteLines(input) {
	const scores = input.reduce((scores, line) => {
		const startTags = [];
		for (let char of line.split("")) {
			if (CONNECTED_TAGS[char]) {
				startTags.push(char);
			} else if (END_TAGS[char]) {
				startTags.pop()
			}
		}
		let tagScore = 0;
		startTags.reverse().forEach(tag => {
			tagScore *= 5;
			tagScore += AUTO_COMPLETE_SCORE[tag];
		})
		scores.push(tagScore);
		return scores;
	}, [])
	const sortedScores = scores.sort((a, b) => a -b);
	return sortedScores[Math.floor((sortedScores.length - 1) / 2)]
}

function filterOutCorruptedLines(input) {
	return input.filter(line => {
		const startTags = [];
		return line
		.split("")
		.every(char => {
			if (CONNECTED_TAGS[char]) {
				startTags.push(char);
			} else if (END_TAGS[char]) {
				if (CONNECTED_TAGS[startTags.pop()] !== char) {
					return false;
				}
			}
			return true;
		})
	})
}

getAutoCompleteScore();