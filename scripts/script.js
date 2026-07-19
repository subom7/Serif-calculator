import { noOfRepetitions } from "./utils/string-utils.js";



const equationElement = document.querySelector('.js-equation');

addButtonClickListeners();

document.addEventListener('keydown', (key) => {
    console.log(key.key);
    if(key.key === '0') {
        zero();
    }else if(Number.isInteger(Number(key.key))) {
        appendValue(key.key);
    }else if(key.key === 'Backspace') {
        backSpace();
    }else if(key.key === '.') {
        point();
    }else if(key.key === "+") {
        plus();
    }else if(key.key === "-") {
        minus();
    }else if(key.key === "*") {
        multiply();
    }else if(key.key === "/") {
        divide();
    }else if(key.key === "%") {
        appendValue('%');
    }else if((key.key === ")")  || (key.key === "(") ){
        parenthesis();
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

    document.querySelector('.button-ac').addEventListener('click', () => {
        clear();
    });

    document.querySelector('.button-plus').addEventListener('click', () => {
        plus();
    });

    document.querySelector('.button-minus').addEventListener('click', () => {
        minus();
    });

    document.querySelector('.button-parenthesis').addEventListener('click', () => {
        parenthesis();
    });

    document.querySelector('.button-multiply').addEventListener('click', () => {
        multiply();
    });

    document.querySelector('.button-divide').addEventListener('click', () => {
        divide();
    });

    document.querySelector('.button-percent').addEventListener('click', () => {
        appendValue('%');
    });
}

function appendValue(value) {
    if((equationElement.innerHTML !== '0')) {
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

    // console.log(operands);
    // console.log(lastOperand);

    // console.log('(lastOperand).includes(".")');
    // console.log((lastOperand).includes("."));


    // console.log('Number(lastOperand) > 0');
    // console.log(Number(lastOperand) > 0);


    // console.log('Number(lastOperand) < 0');
    // console.log(Number(lastOperand) < 0);


    if((lastOperand).includes(".") || Number(lastOperand) > 0 || Number(lastOperand) < 0) {
        appendValue(0);
    }else if(lastOperand === '') {
        appendValue(0);
    }
}

function point() {
    if(("/*-+()%").includes(equationElement.innerHTML.at(-1))) {
        appendValue('0.');
        return;
    }

    const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
    const lastOperand = operands.at(-1);
    if(!lastOperand.includes('.')) {
        equationElement.innerHTML += '.';
    }
}

function clear() {
    equationElement.innerHTML = '0';
}

function plus() {
    if(!("/*-+%").includes(equationElement.innerHTML.at(-1))) {
        equationElement.innerHTML += '+';
    } else {
        equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '+';
    }
}

function minus() {
    if(!("/*-+%").includes(equationElement.innerHTML.at(-1))) {
        equationElement.innerHTML += '-';
    } else {
        equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '-';
    }
}

function multiply() {
    if((")%1234567890.").includes(equationElement.innerHTML.at(-1))) {
        equationElement.innerHTML += '*';
    } else if(equationElement.innerHTML.at(-1) === '(') {
        return;
    } else if (("/*-+").includes(equationElement.innerHTML.at(-1))) {
        equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '*';
    }
}

function divide() {
    if((")%1234567890.").includes(equationElement.innerHTML.at(-1))) {
        equationElement.innerHTML += '/';
    } else if(equationElement.innerHTML.at(-1) === '(') {
        return;
    } else if (("/*-+").includes(equationElement.innerHTML.at(-1))) {
        equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '/';
    }
}

function parenthesis() {
    if(("/*-+(%").includes(equationElement.innerHTML.at(-1))) {
        appendValue('(');
        return;
    }
    
    if(('0123456789.)').includes(equationElement.innerHTML.at(-1))) {
        if(noOfRepetitions(equationElement.innerHTML, '(') > noOfRepetitions(equationElement.innerHTML, ')')) {
            appendValue(')');
        } else if((noOfRepetitions(equationElement.innerHTML, '(') == noOfRepetitions(equationElement.innerHTML, '('))) {
            appendValue('(');
        }
    }
}