"use strict";
const { readFileSync } = require("fs");
const inputPath = "../input.txt";

function getVentCoordinates() {
	const measurements = readFileSync(inputPath, { encoding: 'utf8' });
	return measurements
		.split("\n")
		.map(coordinates => {
			const [firstCoordinate, secondCoordinate] = coordinates.split(" -> ");
			const [x1, y1] = firstCoordinate.split(",");
			const [x2, y2] = secondCoordinate.replace(/\r?/g, "").split(",")
			return {
				x1: +x1,
				y1: +y1,
				x2: +x2,
				y2: +y2
			};
		});
}

const ventMatrix = [];
const coordinates = getVentCoordinates();
coordinates.forEach(({ x1, y1, x2, y2 }) => {
	if (x1 === x2) {
		const endPoint = Math.max(y2,y1);
		const startPoint = Math.min(y1, y2);
		for (let i = startPoint; i <= endPoint; i++) {
			ventMatrix[i] = ventMatrix[i] || [];
			ventMatrix[i][x1] = ventMatrix[i][x1] + 1 || 1;
		}
	} else if (y1 === y2) {
		const endPoint = Math.max(x2,x1);
		const startPoint = Math.min(x1, x2);
		for (let i = startPoint; i <= endPoint; i++) {
			ventMatrix[y1] = ventMatrix[y1] || [];
			ventMatrix[y1][i] = ventMatrix[y1][i] + 1 || 1;
		}
	}
})
console.log(ventMatrix);
const score = ventMatrix.reduce((count, row) => {
	count += row.reduce((score, number) => {
		if (number && number > 1) {
			score++;
		}
		return score;
	}, 0)
	return count;
}, 0)
console.log(score);



