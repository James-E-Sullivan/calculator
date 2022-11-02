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
            case "add": case "subtract": case "multiply": case "divide":
                unloadInputQueue();
                currentOperation.operandA = parseInt(previouslyDisplayed.join(''));
                previouslyDisplayed = [];
                currentOperation.operator = input;
                break;
            
            case "clear":
                currentlyDisplayed = [];
                previouslyDisplayed = [];
                inputQueue = [];
                operationStack = [];
                updateDisplay();
                break;
            
            case "negate":
                handleNegation();
                break;
            
            case "equals":
                unloadInputQueue();
                currentOperation.operandB = parseInt(previouslyDisplayed.join(''));
                previouslyDisplayed = [];
                console.log(currentOperation);
                let resultNumber = currentOperation.operateExpression();
                operationStack.push(currentOperation);
                currentOperation = new Operation();
                currentOperation.operandA = resultNumber;
                displayAnswer(resultNumber.toString());

        }
    }
}

function updateDisplay() {
    const displayString = inputQueue.join('');
    displayContent.innerText = displayString;
}

function displayAnswer(answerString) {
    displayContent.innerText = answerString;
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

// Display class used to store information about/update the display
class Display {
    constructor(displayString, displayElement, isAnswer=false) {
        this.displayString = displayString;
        this.displayElement = displayElement;
        this.isAnswer = isAnswer;
    }

    updateDisplay(displayString, isAnswer=false) {
        this.displayString = displayString;
        this.isAnswer = isAnswer;
        this.displayElement.innerText = this.displayString;
    }

    isAnswerDisplayed() {
        return this.isAnswer;
    }
}

class Operation {
    constructor(operator, operandA, operandB) {
        this.operator = operator;
        this.operandA = operandA;
        this.operandB = operandB;
    }

    operateExpression() {
        return operate(this.operator, this.operandA, this.operandB);
    }
}

// set global variables on page load
let currentOperation = new Operation();
let currentDisplay = new Display();
let previouslyDisplayed = []; // array used to store previously displayed value
let inputQueue = []; // array used to store inputs prior to evaluation
let operationStack = []; // array used to store previous operations

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