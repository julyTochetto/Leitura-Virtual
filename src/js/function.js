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

$(document).ready(function() {
    $('#mobile-btn').on('click', function () {
        $('#mobile-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars');
        $(this).find('i').toggleClass('fa-xmark');
    });
});
