let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById("display").textContent = `${previousInput} ${currentOperation} ${currentInput}`;
}

const numberDigit = document.querySelectorAll('.number-btn[data-number]')

for (let i = 0; i < numberDigit.length; i++) {
    const button = numberDigit[i];
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
    })
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
                alert("Error: Division by zero");
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
    document.getElementById("display").textContent = currentInput;
}

const operatorButtons = document.querySelectorAll('.operator-btn[data-operator]')

for (let i = 0; i < operatorButtons.length; i++) {
    const operatorButton = operatorButtons[i];
    operatorButton.addEventListener('click', () => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        currentOperation = operatorButton.dataset.operator;
        previousInput = currentInput;
        currentInput = '';
        document.getElementById("display").textContent = `${previousInput} ${currentOperation} ${currentInput}`;
    })
}

const equalsButton = document.querySelector('.equal-btn');

equalsButton.addEventListener('click', () => {
    if (currentInput === '' || previousInput === '') return;
    compute();
});



