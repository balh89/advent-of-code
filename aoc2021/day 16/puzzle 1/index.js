const { readFileSync } = require("fs");
const inputPath = "../input.txt";

const TYPE_IDS = {
	LITERAL: 4
}
const PACKET_TYPES = {
	OPERATOR: "operator",
	LITERAL: "literal"
}

function decodeBITSTransmission() {
	const input = getInput();
	const bits = new BITS(input);
	const binaryMessage = bits.getBinaryMessage();
}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
}

function hexToBinary(hex) {
	const hexNumber = parseInt(hex, 16);
	return hexNumber.toString(2);
}

function convertBinaryToInteger(binary) {
	return parseInt(binary, 2);
}

class BITS {
	constructor(hexadecimalTransmission) {
		this.hexadecimalTransmission = hexadecimalTransmission;
		this.binaryMessage = this.convertTransmisionToBinary();
		this.packet = this.decodePacket();
	}

	getBinaryMessage() {
		return this.binaryMessage;
	}

	convertTransmisionToBinary() {
		return this.hexadecimalTransmission
			.split("")
			.map(hexToBinary)
			.join("");
	}

	decodePacket({ startIndex = 0 }) {
		const { version, packetType, packetInformation, lengthTypeId } = getHeaderInformation(_binaryMessage);
		if (packetType = PACKET_TYPES.LITERAL) {
			const dataBits = packetInformation.slice(0, 18);
			return new LiteralPacket(dataBits, version)
		} else {
			if (lengthTypeId === 1) {

			} else {

			}
		}
	}

	// negotiatePacketType(typeId, packetInformation) {
	// 	const packetType = getPacketType(typeId)
	// 	if (packetType === PACKET_TYPES.LITERAL) {
	// 		return new LiteralPacket(packetInformation);
	// 	} else {
	// 		return new OperatorPacket(packetInformation);
	// 	}
	// }

	getPacketType(typeId) {
		switch(typeId) {
			case TYPE_IDS.LITERAL: {
				return PACKET_TYPES.LITERAL;
			}
			default: {
				return PACKET_TYPES.OPERATOR;
			}
		}
	}

	getHeaderInformation(binary) {
		const rawVersion = binary.slice(0, 3);
		const rawTypeId = binary.slice(3, 6);
		const version = convertBinaryToInteger(rawVersion);
		const typeId = convertBinaryToInteger(rawTypeId);
		const packetType = getPacketType(typeId);
		let packetInformation;
		let lengthTypeId;
		if (packetType === PACKET_TYPES.OPERATOR) {
			lengthTypeId = binary[6]
			packetInformation = binary.slice(7);
		} else {
			packetInformation = binary.slice(6);
		}
		return { version, packetType, packetInformation, lengthTypeId };
	}
}

class OperatorPacket extends Packet {
	constructor(dataBits, typeId, version,) {
		super(input);
		this.type = PACKET_TYPES.OPERATOR;
	}

	decode() {

	}
}
class LiteralPacket extends Packet {
	constructor(dataBits, version) {
		super(input);
		this.type = PACKET_TYPES.LITERAL;
	}

	decode() {
		const regex = new Regex("(?<=^(?:.{5})+)(?!$)");
		const [, firstBits, secondBits, thirdBits] = this.input.split(regex);
		const binaryValue = combineBits(firstBits, secondBits, thirdBits);
		valueInDecimal = convertBinaryToInteger(binaryValue);

		function combineBits(...bits) {
			return bits.reduce((combinedBits, bits) => {
				combinedBits += bits.slice(0 , -1);
				return combinedBits;
			}, "")
		}
	}
}

class Packet {
	constructor(dataBits) {
		this.dataBits = dataBits;
		this.children = [];
	}

	setChildren(children) {
		this.children = children;
	}
}

decodeBITSTransmission();