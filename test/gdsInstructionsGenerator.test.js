const gdsInstructionsGenerator = require("../src/gdsInstructionsGenerator");
const sampleAST = require("./sampleAST");

describe('gdsInstructionsGenerator', function() {
  it("generates expected instructions", function () {
    expect(gdsInstructionsGenerator(sampleAST)).toMatchSnapshot();
  });
});
