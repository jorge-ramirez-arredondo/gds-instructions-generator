const jsStringEscape = require("js-string-escape");

function generatePauseCommand(node) {
	return `{
		type: "Pause"
	}`;
}

function generateJSExpression(node) {
	return `{
		type: "JSExpression",
		execute: (_scriptScope) => {
			${node.js}
		}
	}`;
}

function generateDialog(node) {
	return `{
		type: "Dialog",
		execute: (_scriptScope) => {
			_scriptScope.dialog += "${jsStringEscape(node.text)}";
		}
	}`;
}

const GENERATE_COMMAND_TYPE_MAP = {
	Pause: generatePauseCommand
};

const GENERATE_TYPE_MAP = {
	Script: generateScriptInstructions,
	Dialog: generateDialog,
	JSExpression: generateJSExpression,
	Command: (node) => {
		const generateFn = GENERATE_COMMAND_TYPE_MAP[node.cmdType];

		return generateFn ? generateFn(node) : undefined;
	}
};

function generateNodeInstruction(node) {
	if (node === undefined || node === null) {
		return node;
	}

	const generateFn = GENERATE_TYPE_MAP[node.type];

	return generateFn ? generateFn(node) : undefined;
}


function generateScriptInstructions(node) {
	const instructions = node
	  .body
		.map(generateNodeInstruction)
		.filter((childNode) => childNode !== undefined && childNode !== null)
		.join(",\n");

	return `{
		type: "Script",
		instructions: [
			${instructions}
		]
	}`;
}

module.exports = generateScriptInstructions;
