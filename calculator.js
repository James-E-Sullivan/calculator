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
    const buttons = document.querySelectorAll('button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let userInput = btn.getAttribute('id');
            handleUserInput(userInput);

            // for testing
            console.table(inputQueue);
        });
    });
}


function handleUserInput(input) {

    if (!isNaN(parseInt(input))){
        console.log(input);
        addToInputQueue(input);
        updateDisplay();
    } else {
        switch (input) {
            case "add", "subtract", "multiply", "divide":
                unloadInputQueue();
                break;
            
            case "clear":
                currentlyDisplayed = [];
                previouslyDisplayed = [];
                inputQueue = [];
                operationStack = [];
                break;
            
            case "negate":
                handleNegation();
        }
    }
}

function updateDisplay() {
    const displayString = inputQueue.toString();
    displayContent.innerText = displayString;
}


function unloadInputQueue() {
    while (inputQueue.length > 0) {
        previouslyDisplayed.push(inputQueue.shift());
    }
}

function handleNegation() {
    if (inputQueue[0] === "-") {
        inputQueue.shift();  // remove negative sign if present
    } else {
        inputQueue.unshift("-"); // add negative sign if absent
    }
    updateDisplay();
}

function addToInputQueue(input) {
    inputQueue.push(input);
}

// display object
const displayContent = document.getElementById('display-content');

// array used to store currently displayed value
const currentlyDisplayed = [];

// array used to store previously displayed value
const previouslyDisplayed = [];

// array used to store inputs prior to evaluation
const inputQueue = [];

// array used to store previous operations
const operationStack = [];

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


// start on page load
getNumberInput();

// for testing - do not touch
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
};