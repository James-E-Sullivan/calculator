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
function getButtonInput() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let userInput = btn.getAttribute('id');
            handleUserInput(userInput);
        });
    });
}

function getKeyboardInput() {
    addEventListener('keydown', (e) => {
        const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
        const operatorKeys = ['+', '-', '*', '/', '=', 'Enter']
        const calcKeys = ['c', 'C', '!', 'Backspace']

        const keyMap = new Map([
            ['0', '0'],
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9'],
            ['.', 'decimal'],
            ['+', 'add'],
            ['-', 'subtract'],
            ['*', 'multiply'],
            ['/', 'divide'],
            ['=', 'equals'],
            ['Enter', 'equals'],
            ['c', 'clear'],
            ['C', 'clear'],
            ['!', 'negate'],
            ['Backspace', 'undo']
        ]);

        let userInput = `${e.key}`;
        console.log(userInput);
        const mapKeys = [...keyMap.keys()];
        
        if (mapKeys.includes(userInput)) {
            handleUserInput(keyMap.get(userInput));
        }
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
                break;

            case "decimal":
                handleDecimal();
                break;

            case "undo":
                handleUndo();
                break;
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
        currentDisplay.updateDisplay(currentOperation.operandA.toString(), true);
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
    // if inputQueue has no decimal in it
    if (!(inputQueue.some(value => value === "."))) {
        inputQueue.push(".");
        currentDisplay.updateDisplay(inputQueue.join(''));
    }

    console.log("After decimal is handled")
    console.table(inputQueue);
    console.log(currentOperation);
}

function handleUndo() {
    // if an operator button is pressed, undo button removes operator from Operation
    if (currentOperation.hasOperator()) {
        currentOperation.operator = null;
        currentDisplay.updateDisplay(currentOperation.operandA.toString());
    } else if (operationStack.length > 0) { // reset to last operation
        currentOperation = operationStack.pop();
        currentOperation.operandB = null;
        currentOperation.operator = null;
        currentDisplay.updateDisplay(currentOperation.operandA.toString());
        inputQueue.length = 0;
    } else { // no previous operations - just remove what is on the display
        inputQueue.length = 0;
        currentDisplay.updateDisplay('');
    }
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
        if (displayString.length > 18) {  // display string too large
            let decimalIndex;
            let exponentialIndex;
            for (let i = 0; i < displayString.length; i++) {
                if (displayString[i] === ".") { // decimal in string
                    decimalIndex = i;
                }
                if (displayString[i] === "e") { // exponential notation
                    exponentialIndex = i;
                }
            }
            if (exponentialIndex != null) {  // the number is in exponential notation
                let split = displayString.split('e');
                let before = split[0]; // before 'e'
                let after = split[1]; // after 'e'
                let allowedLength = 17 - after.length - 2;
                let splitNumber = parseFloat(before);
                let smallNumber = splitNumber.toFixed(allowedLength);
                displayString = smallNumber + 'e' + after;
            } else if (decimalIndex != null && decimalIndex < 17) { // there's a decimal but no 'e'
                    let allowedDecimals = 17 - decimalIndex - 1;
                    let displayFloat = parseFloat(displayString); // string into float
                    displayString = displayFloat.toFixed(allowedDecimals); // toFixed returns string
            } else {
                let displayNumber = parseInt(displayString);
                displayNumber = displayNumber.toExponential(6);
                displayString = displayNumber.toString();
            }            
        }
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
        return !(this.operator == null);
    }

    hasOperandA() {
        return !(this.operandA == null);
    }

    hasOperandB() {
        return !(this.operandB == null);
    }
}


// set global variables on page load
const displayContentDiv = document.getElementById('display-content'); 
let currentOperation = new Operation();
let currentDisplay = new Display('', displayContentDiv);
let inputQueue = []; // array used to store inputs prior to evaluation
let operationStack = []; // array used to store previous operations


// start eventListener on page load
getButtonInput();
getKeyboardInput();

// for testing - do not touch
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
};