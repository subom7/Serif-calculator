import { noOfRepetitions } from './utils/string-utils.js';

let resultVisible = false;

const equationElement = document.querySelector('.js-equation');


export const operations = {
    plus: function() {
        if(!("/*-+%").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '+';
        } else {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '+';
        }
    },

    minus: function() {
        if(!("/*-+%").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '-';
        } else {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '-';
        }
    },

    multiply: function() {
        if((")%1234567890.").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '*';
        } else if(equationElement.innerHTML.at(-1) === '(') {
            return;
        } else if (("/*-+").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '*';
        }
    },

    divide: function() {
        if((")%1234567890.").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '/';
        } else if(equationElement.innerHTML.at(-1) === '(') {
            return;
        } else if (("/*-+").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '/';
        }
    },

    parenthesis: function() {
        if(("/*-+(%").includes(equationElement.innerHTML.at(-1))) {
            this.appendValue('(');
            return;
        } 
        
        if(('0123456789.)').includes(equationElement.innerHTML.at(-1))) {
            if(noOfRepetitions(equationElement.innerHTML, '(') > noOfRepetitions(equationElement.innerHTML, ')')) {
                this.appendValue(')');
            } else if((noOfRepetitions(equationElement.innerHTML, '(') == noOfRepetitions(equationElement.innerHTML, '('))) {
                this.appendValue('*(');
            }
        }
    },

    appendValue: function(value) {
        if((equationElement.innerHTML !== '0')) {
            equationElement.innerHTML += value;
        } else {
            equationElement.innerHTML = value;
        }
    },

    backSpace: function() {
        equationElement.innerHTML = equationElement.innerHTML.slice(0, -1);
        if (equationElement.innerHTML === '') {
            equationElement.innerHTML = "0";
        }
    },

    zero: function() {
        const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
        const lastOperand = operands.at(-1);

        if((lastOperand).includes(".") || Number(lastOperand) > 0 || Number(lastOperand) < 0) {
            this.appendValue(0);
        }else if(lastOperand === '') {
            this.appendValue(0);
        }
    },

    point: function() {
        if(("/*-+()%").includes(equationElement.innerHTML.at(-1))) {
            this.appendValue('0.');
            return;
        }

        const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
        const lastOperand = operands.at(-1);
        if(!lastOperand.includes('.')) {
            equationElement.innerHTML += '.';
        }
    },

    clear: function() {
        equationElement.innerHTML = '0';
    },

    equal: function() {
        try {
            const formattedEqun = equationElement.innerHTML.replace('%', '/100');
            const result = eval(formattedEqun);


            const resultElement = document.querySelector('.js-result');
            equationElement.classList.remove('equation-default', 'equation-max', 'equation-min');
            equationElement.classList.add('equation-min');
            resultElement.classList.remove('result-default', 'result-max', 'result-min');
            resultElement.classList.add('result-max');

            resultVisible = true;

            resultElement.innerHTML = result;
        } catch (error) {
            resultElement.innerHTML = 'Error';
        }
    }
}
