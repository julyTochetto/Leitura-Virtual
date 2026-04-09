const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.close-shopping');
const list =  document.querySelector('.list');
const listCard =  document.querySelector('.list-card');
const total =  document.querySelector('.total');
const body =  document.querySelector('body');
const quantity =  document.querySelector('.quantity');
const searchInput = document.querySelector('.searchInput');
const shopMobile = document.querySelector('.shopping');


if (openShopping) {
    openShopping.addEventListener('click', () => {
        body.classList.add('active');
    });
};

if (closeShopping) {
    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
}

if (total) {
    total.addEventListener('click', () => {
        body.classList.remove('active');
    });
}

let listCards = [];

let products = [];

fetch("json/book.json")
.then(res => res.json())
.then(data => {
    products = data;
    show(products);
});

const show = (filteredList) => {
    list.innerHTML = "";

    filteredList.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.capa}">
            <div class = "title">${value.titulo}</div>
            <div class = "writer">${value.autor}</div>
            <div class="buttons">
                <button  class = "btn-default" onclick = "window.open('${value.arquivo}','_blank')">Ler</button>
                <button  class = "btn-default" onclick = "addToCard(${key})">Favoritar</button>
            </div>
        `;

        list.appendChild(newDiv);
    });
};



const selectWriter = document.getElementById("writer");

const apply = () => {
    const activeBtn = document.querySelector('.filter-btn.active');
    const gender = activeBtn ? activeBtn.dataset.filter: 'todos';
    const writer = selectWriter.value;
    const search = searchInput.value.toLowerCase().trim();

    let result = products.filter(product => {
        const matchSearch = product.titulo.toLowerCase().includes(search) || product.autor.toLowerCase().includes(search)
        const matchCategory = (gender === 'todos') || (product.genero.toLowerCase() === gender.toLowerCase());
        const matchWriter = ( writer === "default") || (product.autor === writer);
        return matchSearch && matchCategory && matchWriter;
    });

    show(result);
};

searchInput.addEventListener('input', apply);

const btnFilter = document.querySelectorAll('.filter-btn');
btnFilter.forEach( btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        apply();
    });
});

selectWriter.addEventListener('change', apply);

const addToCard = (key) => {
    if(!listCards.some(item => item && item.titulo === products[key].titulo)) {
        listCards[key] = { ...products[key] };
        reloadCard();
    } else {
        alert('Livro já favoritado anteriormente');
    }
};

const reloadCard = ()=> {
    listCard.innerHTML = "";
    let count = 0;

    listCards.forEach((value, key) => {
        if(value != null) {
            count++;
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="${value.capa}"></div>
                <div class = "cardTitle">${value.titulo}</div>
                <button class = "cardButton" onclick = "removeFav(${key})">Remover</button>
            `;
            listCard.appendChild(newDiv);
        }
    });
    quantity.innerText = count;
    localStorage.setItem('cart', JSON.stringify(listCards));
};

const removeFav = (key) => {
    delete listCards[key];
    reloadCard();
}

function localCart() {
    const saveCart = localStorage.getItem('cart');
    if(saveCart) {
        listCards = JSON.parse(saveCart);
        reloadCard();
    }
}