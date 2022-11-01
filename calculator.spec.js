const calculator = require('./calculator');

describe('add', () => {
    test('adds 0 and 0', () => {
        expect(calculator.add(0,0)).toBe(0);
    });

    test('adds 2 and 2', () => {
       expect(calculator.add(2,2)).toBe(4); 
    });

    test('adds positive numbers', () => {
        expect(calculator.add(2,6)).toBe(8);
    });

    test('adds negative numbers', () => {
        expect(calculator.add(-3, -1)).toBe(-4);
    });
});

describe('add', () => {
    test('subtracts numbers', () => {
        expect(calculator.subtract(10,4)).toBe(6);
    });

    test('subtracts negative numbers', () => {
        expect(calculator.subtract(-3,-1)).toBe(-2);
    });
});

describe('multiply', () => {
    test('multiply two positive numbers', () => {
        expect(calculator.multiply(10,4)).toBe(40);
    });

    test('multiply one negative and one positive number', () => {
        expect(calculator.multiply(4, -3)).toBe(-12);
    });

    test('multiply two negative numbers', () => {
        expect(calculator.multiply(-2, -3)).toBe(6);
    });
});

describe('divide', () => {
    test('divide two positive integers', () => {
        expect(calculator.divide(16,4)).toBe(4);
    });

    test('divide one positive and one negative integer', () => {
        expect(calculator.divide(-9,3)).toBe(-3);
    });

    test('divide two negative integers', () => {
        expect(calculator.divide(-20, -5)).toBe(4);
    });

    test('divide decimal numbers', () => {
        expect(calculator.divide(16.5, 8)).toBe(2.0625);
    });
});