let calculationHistory = JSON.parse(localStorage.getItem('history')) || [];

export function renderHistory() {
    let historyHTML = '';

    calculationHistory.forEach((element) => {
        historyHTML += `
        <div class="history-item-container">
                    <div class="history-text-container">
                        <p class="history-result">${element.result}</p>
                        <p class="history-equation">${element.equation}</p>
                    </div>
                    <div class="history-delete-container">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
        `;
    });

    document.querySelector('.div-history').innerHTML = historyHTML;
}

export function addHistory(result, equation) {
    calculationHistory.unshift({result: result, equation: equation});
    renderHistory();
    localStorage.setItem('history', JSON.stringify(calculationHistory));
}