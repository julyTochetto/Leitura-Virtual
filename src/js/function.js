const darkBtn = document.querySelector('.fa-moon');

darkBtn.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    let novo;

    if (temaAtual === 'dark') {
        novo = 'light';
        darkBtn.classList.replace('fa-sun', 'fa-moon');
    } else {
        novo = 'dark';
        darkBtn.classList.replace('fa-moon', 'fa-sun');
    }

    document.documentElement.setAttribute('data-theme', novo)
    localStorage.setItem('temaAtual', novo);
});

function save () {
    const tema = localStorage.getItem('temaAtual');

    if (tema === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        
        if ( darkBtn.classList.contains('fa-moon')) {
            darkBtn.classList.replace('fa-moon', 'fa-sun');

        }
    }
}

save();



$(document).ready(function() {
    $('#mobile-btn').on('click', function () {
        $('#mobile-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars');
        $(this).find('i').toggleClass('fa-xmark');
    });
});
