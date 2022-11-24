"use strict";
const fs = require("fs");
const readline = require('readline');
const inputPath = "../input.txt";

async function diagnoseSubmarine() {
	const powerGeneratorDiagnoser = new PowerGeneratorDiagnoser()
	const lifeSupportDiagnoser = new LifeSupportDiagnoser();
	await generatePowerConsumptionReport(powerGeneratorDiagnoser);
	await generateLifeSupportRatingReport(lifeSupportDiagnoser);
}

async function generatePowerConsumptionReport(powerGeneratorDiagnoser) {
	await powerGeneratorDiagnoser.decodeDiagnosticReport();
	const powerConsumption = powerGeneratorDiagnoser.getPowerConsumption();
	console.log(`The power consumption of the submarine is: ${powerConsumption}`);
}

async function generateLifeSupportRatingReport(lifeSupportDiagnoser) {
	const lifeSupportRating = await lifeSupportDiagnoser.getLifeSupportRating();
	console.log(`The life support rating of the submarine is: ${lifeSupportRating}`);
}


function LifeSupportDiagnoser() {
	this.oxygenGeneratorDiagnoser = new OxygenGeneratorDiagnoser();
	this.co2ScrubberDiagnoser = new Co2ScrubberDiagnoser();
}

LifeSupportDiagnoser.prototype = Object.create(SubmarineDiagnoser.prototype);

LifeSupportDiagnoser.prototype.getLifeSupportRating = async function() {
	await this.oxygenGeneratorDiagnoser.decodeDiagnosticReport();
	const oxygenRating =  await this.oxygenGeneratorDiagnoser.getRating();
	console.log(`The oxygen rating of the submarine is: ${oxygenRating}`);

	await this.co2ScrubberDiagnoser.decodeDiagnosticReport();
	const co2ScrubberRating =  await this.co2ScrubberDiagnoser.getRating();
	console.log(`The co2 scrubber rating of the submarine is: ${co2ScrubberRating}`);


	const oxygenRatingInDecimal = this.convertBinaryToDecimal(oxygenRating);
	const co2ScrubberRatomgInDecimal = this.convertBinaryToDecimal(co2ScrubberRating);
	return oxygenRatingInDecimal * co2ScrubberRatomgInDecimal;
}



function Co2ScrubberDiagnoser() {
	this.bitCount = { bits: {}, values: [] };
	SubmarineDiagnoser.call(this);
}

Co2ScrubberDiagnoser.prototype = Object.create(SubmarineDiagnoser.prototype);

Co2ScrubberDiagnoser.prototype.resetBitCount = function() {
	this.bitCount = { bits: {}, values: [] };
}

Co2ScrubberDiagnoser.prototype.interpret = async function(binary, bitPosition = 0) {
	const bit = binary[bitPosition];
	this.bitCount.bits[bit] = this.bitCount.bits[bit] + 1 || 1
	if (!this.bitCount.values) {
		this.bitCount.values = [];
	}
	this.bitCount.values.push(binary);
}

Co2ScrubberDiagnoser.prototype.getRating = async function(bitPosition = 0) {
	const bitCount = this.getBitCount();
	const { "0": zeros, "1": ones } = bitCount.bits;
	const values = bitCount.values;

	let filteredValues;
	if (zeros < ones || zeros === ones) {
		filteredValues = values.filter(value => value[bitPosition] == 0);
	} else {
		filteredValues = values.filter(value => value[bitPosition] == 1);
	}
	if (filteredValues.length === 1) {
		return filteredValues[0];
	}
	this.resetBitCount();
	const nextBitPosition = bitPosition + 1;
	for (const value of filteredValues) {

		await this.interpret(value, nextBitPosition)
	}
	return this.getRating(nextBitPosition);
}

function OxygenGeneratorDiagnoser() {
	this.bitCount = { bits: {}, values: [] };
	SubmarineDiagnoser.call(this);
}

OxygenGeneratorDiagnoser.prototype = Object.create(SubmarineDiagnoser.prototype);

OxygenGeneratorDiagnoser.prototype.interpret = async function(binary, bitPosition = 0) {
	const bit = binary[bitPosition];
	this.bitCount.bits[bit] = this.bitCount.bits[bit] + 1 || 1
	if (!this.bitCount.values) {
		this.bitCount.values = [];
	}
	this.bitCount.values.push(binary);
}


OxygenGeneratorDiagnoser.prototype.getRating = async function(bitPosition = 0) {
	const bitCount = this.getBitCount();
	const { "0": zeros, "1": ones } = bitCount.bits;
	const values = bitCount.values;

	let filteredValues;
	if (ones > zeros || zeros === ones) {
		filteredValues = values.filter(value => value[bitPosition] == 1);
	} else {
		filteredValues = values.filter(value => value[bitPosition] == 0);
	}
	if (filteredValues.length === 1) {
		return filteredValues[0];
	}
	this.resetBitCount();
	const nextBitPosition = bitPosition + 1;
	for (const value of filteredValues) {
		await this.interpret(value, nextBitPosition)
	}
	return this.getRating(nextBitPosition);
}

OxygenGeneratorDiagnoser.prototype.resetBitCount = function() {
	this.bitCount = { bits: {}, values: [] };
}

function PowerGeneratorDiagnoser() {
	this.bitCount = {};
	SubmarineDiagnoser.call(this);
}

PowerGeneratorDiagnoser.prototype = Object.create(SubmarineDiagnoser.prototype);

PowerGeneratorDiagnoser.prototype.interpret = async function(binary) {
	this.bitCount = binary
		.split("")
		.reduce((bitCount, char, index) => {
			bitCount[index] = bitCount[index] || {};
			bitCount[index][char] = bitCount[index][char] + 1 || 1
			return bitCount;
		}, this.getBitCount())
}

PowerGeneratorDiagnoser.prototype.getGammaRate = function() {
	return Object
		.entries(this.getBitCount())
		.reduce((acc, [position, { "0": zeros, "1": ones }]) => {
			acc[position] = zeros > ones ? 0 : 1;
			return acc;
		}, [])
		.join("")
}

PowerGeneratorDiagnoser.prototype.getEpsilonRate = function() {
	return Object
		.entries(this.getBitCount())
		.reduce((acc, [position, { "0": zeros, "1": ones }]) => {
			acc[position] = zeros > ones ? 1 : 0;
			return acc;
		}, [])
		.join("")
}

PowerGeneratorDiagnoser.prototype.getPowerConsumption = function() {
	const gammaRate = this.getGammaRate();
	const epsilonRate = this.getEpsilonRate();
	const gammaRateInDecimal = this.convertBinaryToDecimal(gammaRate);
	const epsilonRateInDecimal = this.convertBinaryToDecimal(epsilonRate);
	return gammaRateInDecimal * epsilonRateInDecimal;
}


function SubmarineDiagnoser() {
	this.getDiagnosticReport = async function*() {
		const readStream = fs.createReadStream(inputPath, "utf8");
		const readLine = readline.createInterface({
			input: readStream,
			crlfDelay: Infinity
		});

		for await (const line of readLine) {
			yield line;
		}
	}

	this.diagnosticReport = this.getDiagnosticReport();
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

SubmarineDiagnoser.prototype.convertBinaryToDecimal = function(binary) {
	return parseInt(binary, 2);
}

SubmarineDiagnoser.prototype.getBitCount = function() {
	return this.bitCount;
}


diagnoseSubmarine()