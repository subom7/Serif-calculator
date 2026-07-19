import { noOfRepetitions } from './utils/string-utils.js';
import { addHistory } from './history.js';

let resultVisible = false;

const equationElement = document.querySelector('.js-equation');
const resultElement = document.querySelector('.js-result');


export const operations = {
    plus: function() {
        if(resultVisible) {
            
            setDisplayState(equationElement, "equation", "default");
            setDisplayState(resultElement, "result", "default");
            
            equationElement.innerHTML = resultElement.innerHTML+'+';
            resultVisible = false;
        } else if(!("/*-+%").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '+';
        } else {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '+';
        }
    },

    minus: function() {
        if(resultVisible) {
            
            setDisplayState(equationElement, "equation", "default");
            setDisplayState(resultElement, "result", "default");
            
            equationElement.innerHTML = resultElement.innerHTML+'-';
            resultVisible = false;
        } else if(!("/*-+%").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '-';
        } else {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '-';
        }
    },

    multiply: function() {
        if(resultVisible) {
            
            setDisplayState(equationElement, "equation", "default");
            setDisplayState(resultElement, "result", "default");
            
            equationElement.innerHTML = resultElement.innerHTML+'*';
            resultVisible = false;
        } else if((")%1234567890.").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML += '*';
        } else if(equationElement.innerHTML.at(-1) === '(') {
            return;
        } else if (("/*-+").includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1) + '*';
        }
    },

    divide: function() {
        if(resultVisible) {
            
            setDisplayState(equationElement, "equation", "default");
            setDisplayState(resultElement, "result", "default");
            
            equationElement.innerHTML = resultElement.innerHTML+'/';
            resultVisible = false;
        } else if((")%1234567890.").includes(equationElement.innerHTML.at(-1))) {
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
            if(equationElement.innerHTML === '0') {
                equationElement.innerHTML = '(';
            } else if(noOfRepetitions(equationElement.innerHTML, '(') > noOfRepetitions(equationElement.innerHTML, ')')) {
                this.appendValue(')');
            } else if((noOfRepetitions(equationElement.innerHTML, '(') == noOfRepetitions(equationElement.innerHTML, ')'))) {
                this.appendValue('*(');
            }
        }
    },

    appendValue: function(value) {
        if((equationElement.innerHTML === '0')) {
            equationElement.innerHTML = value;
        } else {
            if(resultVisible) {
                equationElement.classList.remove('equation-default', 'equation-max', 'equation-min');
                equationElement.classList.add('equation-max');
                resultElement.classList.remove('result-default', 'result-max', 'result-min');
                resultElement.classList.add('result-min');
                equationElement.innerHTML = value;
                resultVisible = false;
            } else if(value === 0){
                const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
                const lastOperand = operands.at(-1);
                if(lastOperand === '') {
                    return;
                } else if(lastOperand.includes('.')) {
                    equationElement.innerHTML += value;
                } else {
                    equationElement.innerHTML += 0;
                }
            } else {
                equationElement.innerHTML += value;
            }
        }
    },

    backSpace: function() {
        if(resultVisible) {
            
            setDisplayState(equationElement, "equation", "default");
            setDisplayState(resultElement, "result", "default");
            
            equationElement.innerHTML = resultElement.innerHTML.slice(0, -1);
            resultVisible = false;
        } else {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1);
            if (equationElement.innerHTML === '') {
                equationElement.innerHTML = "0";
            }
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
            equationElement.innerHTML += '0.';
            return;
        }

        if(resultVisible) {
            setDisplayState(equationElement, "equation", "max");
            setDisplayState(resultElement, "result", "min");

            resultVisible = false;
            equationElement.innerHTML = '0.';
        } else {
            const operands = equationElement.innerHTML.split(/[+\-%/*()]/);
            const lastOperand = operands.at(-1);
            if(!lastOperand.includes('.')) {
                equationElement.innerHTML += '.';
            }
        }
    },

    clear: function() {
        equationElement.innerHTML = '0';
        if(resultVisible) {
            setDisplayState(equationElement, "equation", "max");
            setDisplayState(resultElement, "result", "min");
            resultVisible = false;
        }
    },

    equal: function() {
        if(('-+*/').includes(equationElement.innerHTML.at(-1))) {
            equationElement.innerHTML = equationElement.innerHTML.slice(0, -1);
        }

        let result;
        try {
            const formattedEqun = equationElement.innerHTML.replaceAll('%', '/100');
            result = eval(formattedEqun);
            if (!isFinite(result)) result = 'Error';
        } catch (error) {
            result = 'Error';
        }


        setDisplayState(equationElement, "equation", "min");
        setDisplayState(resultElement, "result", "max");

        resultVisible = true;
        resultElement.innerHTML = result;

        if (result !== 'Error') {
            addHistory(String(result), String(equationElement.innerHTML));
        }
    }
}


function setDisplayState(element, prefix, state) {
    element.classList.remove(`${prefix}-default`, `${prefix}-max`, `${prefix}-min`);
    element.classList.add(`${prefix}-${state}`);
}