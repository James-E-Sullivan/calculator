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


// display functions
function getNumberInput() {
    const numberButtons = document.querySelectorAll('.num-btn');

    numberButtons.forEach((numBtn) => {
        numBtn.addEventListener('click', () => {
            
        });
    });
}

function addToOperationQueue(input) {
    // to be added ... will add btn input to a queue
}

// array used to store inputs prior to evaluation
const operationQueue = [];

class Operation {
    constructor(operator, operandA, operandB) {
        this.operator = operator;
        this.operandA = operandA;
        this.operandB = operandB;
    }

    operateExpression() {
        return operate(operator, this.operandA, this.operandB);
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