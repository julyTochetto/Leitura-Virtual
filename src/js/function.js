const darkBtn = document.querySelector('.fa-moon');

darkBtn.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme');

    if (temaAtual === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        darkBtn.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkBtn.classList.replace('fa-moon', 'fa-sun');
    }
});