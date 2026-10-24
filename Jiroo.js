let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    const trimmedValue = value.trim();

    if (isNaN(trimmedValue) && trimmedValue !== ',') {
        handleSymbol(trimmedValue);
    } else {
        handleNumber(trimmedValue);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'AC':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer.replace(',', '.')));
            previousOperator = null;
            buffer = runningTotal.toString().replace('.', ',');
            runningTotal = 0;
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '%':
            const currentNum = parseFloat(buffer.replace(',', '.'));
            buffer = (currentNum / 100).toString().replace('.', ',');
            break;

        case '+':
        case '-':
        case '×':
        case '÷':
        case '−':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0' && runningTotal === 0) {
        return;
    }

    const floatBuffer = parseFloat(buffer.replace(',', '.'));

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    } else if (previousOperator === '-' || previousOperator === '−') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    } else if (previousOperator === '÷') {
        if (floatBuffer === 0) {
            runningTotal = "Error";
            return;
        }
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString) {
    if (numberString === ',') {
        if (!buffer.includes(',')) {
            buffer += ',';
        }
        return;
    }

    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText);
        }
    });
}

init();