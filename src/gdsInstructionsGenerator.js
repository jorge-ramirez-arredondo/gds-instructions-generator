const flow = require("lodash/fp/flow");

const generateScriptInstructions = require("./generateScriptInstructions");

const FORMATS = {
	string: "string",
	array: "array"
};

const defaultOptions = {
	format: FORMATS.string
};

function gdsInstructionsGenerator(ast, options = {}) {
	const {
		format
	} = { ...defaultOptions, ...options };

	let generate;

	switch (format) {
		case FORMATS.string: {
			generate = generateScriptInstructions;
			break;
		}
		case FORMATS.array: {
			generate = flow(generateScriptInstructions, eval);
			break;
		}
		default: {
			throw new Error(`Invalid generation format "${format}".`);
		}
	}

  return generate(ast);
}

module.exports = gdsInstructionsGenerator;
