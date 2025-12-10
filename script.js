// ========================
// Calculator State
// ========================

let currentInput = '';
let currentOperation = '';
let previousInput = '';

// ========================
// DOM Elements
// ========================

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number-btn[data-number]');
const operatorButtons = document.querySelectorAll('.operator-btn[data-operator]');
const equalsButton = document.querySelector('.equal-btn');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');

// ========================
// Helper Functions
// ========================

function appendNumber(number) {
    currentInput += number;
    display.textContent = `${previousInput} ${currentOperation} ${currentInput}`;
}

function compute() {
    if (previousInput === '' || currentInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Error: Division by zero');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    display.textContent = currentInput;
}

// ========================
// Event Listeners
// ========================

// Number buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
    });
});

// Operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (currentInput === '') return;

        if (previousInput !== '') {
            compute();
        }

        currentOperation = button.dataset.operator;
        previousInput = currentInput;
        currentInput = '';
        display.textContent = `${previousInput} ${currentOperation} ${currentInput}`;
    });
});

// Equals button
equalsButton.addEventListener('click', () => {
    if (currentInput === '' || previousInput === '') return;
    compute();
});

// Delete button
deleteButton.addEventListener('click', () => {
    if (currentInput === '') return;

    currentInput = currentInput.slice(0, -1);

    if (currentInput === '') {
        display.textContent = '0';
    } else {
        display.textContent = `${previousInput} ${currentOperation} ${currentInput}`;
    }
});

// Clear button
clearButton.addEventListener('click', () => {
    currentInput = '';
    currentOperation = '';
    previousInput = '';
    display.textContent = '0';
});
