import {operations} from './operations.js';


const equationElement = document.querySelector('.js-equation');

addButtonClickListeners();

document.addEventListener('keydown', (key) => {
    console.log(key.key);
    if(key.key === '0') {
        operations.zero();
    }else if(Number.isInteger(Number(key.key))) {
        operations.appendValue(key.key);
    }else if(key.key === 'Backspace') {
        operations.backSpace();
    }else if(key.key === '.') {
        operations.point();
    }else if(key.key === "+") {
        operations.plus();
    }else if(key.key === "-") {
        operations.minus();
    }else if(key.key === "*") {
        operations.multiply();
    }else if(key.key === "/") {
        operations.divide();
    }else if(key.key === "%") {
        equationElement.innerHTML += '%';
    }else if((key.key === ")")  || (key.key === "(") ){
        operations.parenthesis();
    }else if(key.key === "Enter") {
        operations.equal();
    }else if(key.key === "Delete") {
        operations.clear();
    }
});


function addButtonClickListeners() {

    document.querySelector('.button-0').addEventListener('click', () => {
        operations.zero();
    });

    for(let i = 1; i <= 9; i++) {
        const element = document.querySelector(`.button-${i}`);
        element.addEventListener('click', () => {
            operations.appendValue(i);
        });
    }

    document.querySelector('.button-delete').addEventListener('click', () => {
        operations.backSpace();
    });

    document.querySelector('.button-point').addEventListener('click', () => {
        operations.point();
    });

    document.querySelector('.button-ac').addEventListener('click', () => {
        operations.clear();
    });

    document.querySelector('.button-plus').addEventListener('click', () => {
        operations.plus();
    });

    document.querySelector('.button-minus').addEventListener('click', () => {
        operations.minus();
    });

    document.querySelector('.button-parenthesis').addEventListener('click', () => {
        operations.parenthesis();
    });

    document.querySelector('.button-multiply').addEventListener('click', () => {
        operations.multiply();
    });

    document.querySelector('.button-divide').addEventListener('click', () => {
        operations.divide();
    });

    document.querySelector('.button-percent').addEventListener('click', () => {
        equationElement.innerHTML += '%';
    });

    document.querySelector('.button-equals').addEventListener('click', () => {
        operations.equal();
    });
}