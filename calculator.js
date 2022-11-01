// arithmetic functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a === 0 || b === 0) return "DIVIDE BY ZERO ERROR";
    return a / b;
}

// for testing - do not touch
module.exports = {
    add,
    subtract,
    multiply,
    divide
};