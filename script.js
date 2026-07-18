const equationElement = document.querySelector('.js-equation');

addButtonClickListeners();

document.addEventListener('keydown', (key) => {
    // console.log(key.key);
    if(key.key === '0') {
        zero();
    }else if(Number.isInteger(Number(key.key))) {
        appendValue(key.key);
    }else if(key.key === 'Backspace') {
        backSpace();
    }else if(key.key === '.') {
        point();
    }
});


function addButtonClickListeners() {

    document.querySelector('.button-0').addEventListener('click', () => {
        zero();
    });

    for(let i = 1; i <= 9; i++) {
        const element = document.querySelector(`.button-${i}`);
        element.addEventListener('click', () => {
            appendValue(i);
        });
    }

    document.querySelector('.button-delete').addEventListener('click', () => {
        backSpace();
    });

    document.querySelector('.button-point').addEventListener('click', () => {
        point();
    });
}

function appendValue(value) {
    if((equationElement.innerHTML !== '0') || (value === '.')) {
        equationElement.innerHTML += value;
    } else {
        equationElement.innerHTML = value;
    }
}

function backSpace() {
    equationElement.innerHTML = equationElement.innerHTML.slice(0, -1);
    if (equationElement.innerHTML === '') {
        equationElement.innerHTML = "0";
    }
}

function zero() {
    const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
    const lastOperand = operands.at(-1);
    if((lastOperand).includes(".") || Number(lastOperand) > 0 || Number(lastOperand) < 0) {
        appendValue(0);
    }
}

function point() {
    const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
    const lastOperand = operands.at(-1);
    if(!lastOperand.includes('.')) {
        appendValue('.');
    }
}