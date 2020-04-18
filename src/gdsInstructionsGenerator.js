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
		}
		case FORMATS.array: {
			generate = flow(generateScriptInstructions, eval);
		}
		default: {
			throw new Error(`Invalid generation format "${format}".`);
		}
	}

  return generate(ast);
}

module.exports = gdsInstructionsGenerator;
