let calculationHistory = JSON.parse(localStorage.getItem('history')) || [];

export function renderHistory() {
    let historyHTML = '';

    calculationHistory.forEach((element) => {
        historyHTML += `
        <div class="history-item-container js-history-item-${element.id}">
                    <div class="history-text-container">
                        <p class="history-result">${element.result}</p>
                        <p class="history-equation">${element.equation}</p>
                    </div>
                    <div class="history-delete-container js-history-delete-container" data-id="${element.id}">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
        `;
    });

    document.querySelector('.div-history').innerHTML = historyHTML;
}

export function addHistory(result, equation) {
    calculationHistory.unshift({
        id: Math.random().toString().replace('.', ''),
        result: result,
        equation: equation
    });
    renderHistory();
    localStorage.setItem('history', JSON.stringify(calculationHistory));
}

export function deleteHistory(id) {
    let newList;
    calculationHistory.forEach((element) => {
        if(element.id !== id) {
            newList.push(element);
        }
    });
    calculationHistory = newList;

    localStorage.setItem('history', JSON.stringify(calculationHistory));
}