// arithmetic functions

function add(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NOT A NUMBER";
    return a + b;
}

function subtract(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NOT A NUMBER";
    return a - b;
}

function multiply(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NOT A NUMBER";
    return a * b;
}

function divide(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NOT A NUMBER";
    if (a === 0 || b === 0) return "DIVIDE BY ZERO ERROR";
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
    }
}

// for testing - do not touch
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
};