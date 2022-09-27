// window.onload = event => {
const btnFinalizarSessao = document.getElementById('closeApp'),
    popup = document.querySelector('.popup-wrapper');

btnFinalizarSessao.onclick = event => {
    popup.style.display = 'block';
};

popup.onclick = event => {
    const classNameOfClickElemente = event.target.classList[0],
        finalizarSessao = 'btn-submit-close' === event.target.classList[0],
        className = ['popup-close', 'popup-wrapper', 'btn-submit-cancel'],
        shouldClosePopup = className.some(className => className === classNameOfClickElemente);

    if (finalizarSessao) {
        localStorage.clear();
        location.replace('index.html');
    }
    if (shouldClosePopup) {
        popup.style.display = 'none';
    }
};
// };
