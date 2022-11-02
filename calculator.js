// arithmetic functions
function add(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NaN";
    return a + b;
}

function subtract(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NaN";
    return a - b;
}

function multiply(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NaN";
    return a * b;
}

function divide(a, b) {
    if (isNaN(a) || isNaN(b)) return "ERROR: NaN";
    if (a === 0 || b === 0) return "ERROR: DIV BY 0";
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




// eventListener handling functions
function getNumberInput() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let userInput = btn.getAttribute('id');
            handleUserInput(userInput);
        });
    });
}

function handleUserInput(input) {

    if (!isNaN(parseInt(input))){  // input is a number
        inputQueue.push(input);
        currentDisplay.updateDisplay(inputQueue.join(''));
    } else {
        switch (input) {
            case "add": case "subtract": case "multiply": case "divide":
                handleOperator(input);
                break;
            
            case "clear":
                // clear display and all data structures
                handleClear();
                break;
            
            case "negate":
                handleNegation();
                break;
            
            case "equals":
                handleEquals();

            case "decimal":
                handleDecimal();
        }
    }
}

function handleOperator(operatorInput) {
    // load inputQueue as operandA only if not empty
    if (inputQueue.length > 0) {
        if (currentOperation.hasOperandA() && currentOperation.hasOperator()) {
            currentOperation.loadOperandB(inputQueue);
            performOperation();
        } else {
            currentOperation.loadOperandA(inputQueue);
        }
        inputQueue.length = 0; // clear array
    }
    currentOperation.operator = operatorInput;
}

function handleNegation() {
    if (currentDisplay.isAnswerDisplayed()) {
        currentOperation.operandA *= -1;
        currentDisplay.updateDisplay(currentOperation.operandA, true);
    } else {
        if (inputQueue[0] === "-") {
            inputQueue.shift();  // remove negative sign if present
        } else {
            inputQueue.unshift("-"); // add negative sign if absent
        }
        currentDisplay.updateDisplay(inputQueue.join(''));
    }
}

function handleClear() {
    // clear display and all global datastructures/objects
    inputQueue.length = 0;
    operationStack.length = 0;
    currentDisplay.updateDisplay('');
    currentOperation = new Operation();
}

function handleEquals() {
    // operation has a value in operandA but no operator
    if (currentOperation.hasOperandA() && !(currentOperation.hasOperator())) {
        if (operationStack.length > 0) {  // there's at least one previous operation

            // load previous operation's operator and operandB into current
            let prevOperation = operationStack[operationStack.length - 1];
            currentOperation.operator = prevOperation.operator;
            currentOperation.operandB = prevOperation.operandB;

            // perform operation now that the operator and operands are set
            performOperation();
        }
    } else if (currentOperation.hasOperandA() && currentOperation.hasOperator()) {
        // operation operandA and an operator, and inputQueue has input values
        if (inputQueue.length > 0) {
            currentOperation.loadOperandB(inputQueue);
            inputQueue.length = 0;  // clear inputQueue
            performOperation();
        } else { // inputQueue is empty
            currentOperation.operandB = currentOperation.operandA;
            performOperation();
        }
    }  // all other instances, do nothing
}

function handleDecimal() {

    console.log("Before decimal is handled")
    console.table(inputQueue);
    console.log(currentOperation);

    // if inputQueue has no decimal in it
    if (!(inputQueue.some(value => value === "."))) {
        inputQueue.push(".");
        currentDisplay.updateDisplay(inputQueue.join(''));
    }

    console.log("After decimal is handled")
    console.table(inputQueue);
    console.log(currentOperation);
}

function performOperation() {
    // perform operation, set currentOperation to new Operation, and update display
    let numberResult = currentOperation.operateExpression()
    operationStack.push(currentOperation);
    currentOperation = new Operation();
    currentOperation.operandA = numberResult;
    currentDisplay.updateDisplay(numberResult.toString(), true);
}

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

    loadOperandA(inputArray) {
        if (!(inputQueue.some(value => value === "."))) {
            this.operandA = parseInt(inputArray.join(''));
        } else {
            this.operandA = parseFloat(inputArray.join(''));
        }
    }

    loadOperandB(inputArray) {
        if (!(inputQueue.some(value => value === "."))) {
            this.operandB = parseInt(inputArray.join(''));
        } else {
            this.operandB = parseFloat(inputArray.join(''));
        }
    }

    hasOperator() {
        return !(this.operator === undefined);
    }

    hasOperandA() {
        return !(this.operandA === undefined);
    }

    hasOperandB() {
        return !(this.operandB === undefined);
    }
}


// set global variables on page load
const displayContentDiv = document.getElementById('display-content'); 
let currentOperation = new Operation();
let currentDisplay = new Display('', displayContentDiv);
let inputQueue = []; // array used to store inputs prior to evaluation
let operationStack = []; // array used to store previous operations


// start eventListener on page load
getNumberInput();

// for testing - do not touch
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
};