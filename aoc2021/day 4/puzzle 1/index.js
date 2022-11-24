const fs = require("fs");
const readline = require("readline");
const inputPath = "../input.txt";

class BingoSubSystem {
	constructor(input) {
		this.input = input;
		this.numbers = [];
		this.drawnNumbers = [];
		this.boards = {};
		this.transposedBoards = {}
	}

	getFileReader() {
		const readStream = fs.createReadStream(this.input, "utf8");
		const reader = readline.createInterface({
			input: readStream,
			crlfDelay: Infinity
		});
		return reader
	}

	async setBingoBoards() {
		const reader = this.getFileReader();
		let lineCount = -1;
		let boardCount = 0;
		const bingoBoards = [];
		for await (const line of reader) {
			if (lineCount < 1) {
				lineCount++;
				continue;
			}
			if (lineCount % 6 === 0) {
				boardCount++;
				lineCount = 1;
				continue;
			}
			if (!line.trim()) {
				continue;
			}
			bingoBoards[boardCount] = bingoBoards[boardCount] || [];
			const bingoRow = line
				.split(/\s{1,2}/)
				.filter(Boolean)
			bingoBoards[boardCount][lineCount - 1] = bingoRow;
			lineCount++;
		}
		this.boards = bingoBoards;
		this.transposedBoards = bingoBoards.map(this.transposeBoard);
	}

	async setBingoNumbers() {
		const reader = this.getFileReader();
		const numbers = await new Promise(resolve => {
			reader.on("line", line => {
				reader.close();
				resolve(line);
			});
		});
		reader.close();
		this.numbers = numbers.split(",");
	}

	transposeBoard(board) {
		return board[0]
			.map((_, index) => {
				return board.map(row => row[index])
			})
	}

	playRound() {
		this.drawNumber();
		return this.checkForWinner();
	}

	drawNumber() {
		this.drawnNumbers.push(this.numbers.shift())
	}

	checkForWinner() {
		const winnerRow = this.checkForWinnerRow(this.boards);
		const winnerColumns = this.checkForWinnerRow(this.transposedBoards);
		return winnerRow || winnerColumns;
	}

	checkForWinnerRow(boards) {
		return boards.find(board => {
			return board.some(row => {
				return row.every(number => this.drawnNumbers.includes(number));
			})
		})
	}

	calculateWinnerScore(board) {
		const sumOfAllUnmarkedNumbers = board.reduce((score, row) => {
			score +=row.reduce((score, number) => {
				debugger;
				if (!this.drawnNumbers.includes(number)) {
					score += +number;
				}
				return score;
			}, 0)
			return score;
		}, 0)
		return sumOfAllUnmarkedNumbers * +this.drawnNumbers.pop();
	}
}

async function startBingoGame() {
	const bingoSubSystem = new BingoSubSystem(inputPath);
	await bingoSubSystem.setBingoNumbers();
	await bingoSubSystem.setBingoBoards();
	let winnerBoard;
	do {
		winnerBoard = await bingoSubSystem.playRound();
	}
	while(!winnerBoard)
	const winnerBoardScore = bingoSubSystem.calculateWinnerScore(winnerBoard)
	console.log(`the winner board score is: ${winnerBoardScore}`);
}

startBingoGame();