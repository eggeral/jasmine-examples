const Calculator = require('../lib/calculator');

describe("Calculator", function () {
    it("can add two numbers", function () {
        // given 
        let calculator = new Calculator();
        // when 
        let result = calculator.add(2,3);
        // then
        expect(result).toBe(5);
    });
});

