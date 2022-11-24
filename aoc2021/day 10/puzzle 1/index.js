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
const ILLEGAL_CHAR_SCORE = {
	")": 3,
	"]": 57,
	"}": 1197,
	">": 25137
}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
}

function getSyntaxErrorHighScore() {
	const input = getInput();
	const score = getSyntaxErrorScore(input)
	console.log(score);
}

function getSyntaxErrorScore(input) {
	return input.reduce((score, line) => {
		const startTags = [];
		for (let char of line.split("")) {
			if (CONNECTED_TAGS[char]) {
				startTags.push(char);
			} else if (END_TAGS[char]) {
				if (CONNECTED_TAGS[startTags.pop()] !== char) {
					score += ILLEGAL_CHAR_SCORE[char];
				}
			}
		}
		return score;
	}, 0)
}

getSyntaxErrorHighScore();