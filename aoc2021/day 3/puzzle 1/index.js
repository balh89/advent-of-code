"use strict";
const fs = require("fs");
const readline = require('readline');
const inputPath = "../input.txt";

async function diagnoseSubmarine() {
	const submarineDiagnoser = new SubmarineDiagnoser();
	await submarineDiagnoser.decodeDiagnosticReport();
	const powerConsumption = submarineDiagnoser.getPowerConsumption();
	console.log(powerConsumption);
}

function SubmarineDiagnoser() {
	this.bitCount = {}
	this.diagnosticReport = this.getDiagnosticReport();
}

SubmarineDiagnoser.prototype.getDiagnosticReport = async function*() {
	const readStream = fs.createReadStream(inputPath, "utf8");
	const readLine = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

	for await (const line of readLine) {
		yield line;
	}
}

SubmarineDiagnoser.prototype.decodeDiagnosticReport = async function() {
	let reportLine
	do {
		reportLine = await this.diagnosticReport.next();
		if (reportLine.value) {
			await this.interpret(reportLine.value);
		}
	}
	while (!reportLine.done)
}

SubmarineDiagnoser.prototype.interpret = async function(binary) {
	this.bitCount = binary
		.split("")
		.reduce((bitCount, char, index) => {
			bitCount[index] = bitCount[index] || {};
			bitCount[index][char] = bitCount[index][char] + 1 || 1
			return bitCount;
		}, this.getBitCount())
}

SubmarineDiagnoser.prototype.getBitCount = function() {
	return this.bitCount;
}

SubmarineDiagnoser.prototype.getGammaRate = function() {
	return Object
		.entries(this.getBitCount())
		.reduce((acc, [position, { "0": zeros, "1": ones }]) => {
			acc[position] = zeros > ones ? 0 : 1;
			return acc;
		}, [])
		.join("")
}

SubmarineDiagnoser.prototype.getEpsilonRate = function() {
	return Object
		.entries(this.getBitCount())
		.reduce((acc, [position, { "0": zeros, "1": ones }]) => {
			acc[position] = zeros > ones ? 1 : 0;
			return acc;
		}, [])
		.join("")
}

SubmarineDiagnoser.prototype.convertBinaryToDecimal = function(binary) {
	return parseInt(binary, 2);
}

SubmarineDiagnoser.prototype.getPowerConsumption = function() {
	const gammaRate = this.getGammaRate();
	const epsilonRate = this.getEpsilonRate();
	const gammaRateInDecimal = this.convertBinaryToDecimal(gammaRate);
	const epsilonRateInDecimal = this.convertBinaryToDecimal(epsilonRate);
	return gammaRateInDecimal * epsilonRateInDecimal;
}

diagnoseSubmarine()