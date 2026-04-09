const openShopping = document.querySelectorAll('.shopping');
const closeShopping = document.querySelector('.close-shopping');
const list =  document.querySelector('.list');
const listCard =  document.querySelector('.list-card');
const total =  document.querySelector('.total');
const body =  document.querySelector('body');
const quantity =  document.querySelector('.quantity');
const searchInput = document.querySelector('.searchInput');
const shopMobile = document.querySelector('.shopping');


openShopping.forEach(btn => {
    btn.addEventListener('click', () => {
        body.classList.add('active');
    });
});

if (closeShopping) {
    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
}

let listCards = [];

let products = [];

fetch("src/json/book.json")
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
            <img src="/src/img/${value.Image}">
            <div class = "title">${value.name}</div>
            <div class = "writer">${value.writer}</div>
            <button  class = "btn-default" onclick = "addToCard(${key})">Favoritar</button>
        `;

        list.appendChild(newDiv);
    });
};

show(products);

const selectWriter = document.getElementById("writer");

const apply = () => {
    const activeBtn = document.querySelector('.filter-btn.active');
    const gender = activeBtn.dataset.filter;
    const writer = selectWriter.value;
    const search = searchInput.value.toLowerCase().trim();

    let result = products.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(search) || product.writer.toLowerCase().includes(search)
        const matchCategory = (gender === 'todos') || (product.category === gender);
        const matchWriter = ( writer === "default") || (product.writer === writer);
        return matchSearch && matchCategory && matchWriter;
    });

    show(result);
};

searchInput.addEventListener('input', apply);

const addToCard = (key) => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
    }

    reloadCard();
};

const reloadCard = ()=> {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if(value != null) {
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="/src/images/${value.Image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">R$ ${value.price.toLocaleString()}</div>

                <div class = "quantity-controls">
                    <button class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = "R$ " + totalPrice.toLocaleString();
    quantity.innerText = count;

    const allSpan = document.querySelectorAll('.quantity');
        allSpan.forEach(span => {
            span.innerHTML = count;
        });

    localStorage.setItem('cart', JSON.stringify(listCards));
};


const changeQuantity = (key, quantity) => {
    if(quantity == 0 ) {
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }

    reloadCard();
};

const button = document.querySelectorAll('.filter-btn');

button.forEach(btn => {
    btn.addEventListener('click',(e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');

        apply();
    });
});

const selectPrice = document.getElementById('price');

const finishBtn = document.querySelector('.total');

finishBtn.addEventListener('click', () => {
    if(listCards.length > 0 && listCards.some(item => item !== null)) {
        alert("Compra finalizada! Obrigado por apoiar a Patinha Surpresa");

        listCards = [];
        reloadCard();
        body.classList.remove('active');
    } else {
        alert("Seu carrinho está vazio! Adicione algum mimo para o seu pet");
    }
});

selectPrice.addEventListener('change', () => {
    apply();
});

function localCart() {
    const saveCart = localStorage.getItem('cart');
    if(saveCart) {
        listCards = JSON.parse(saveCart);
        reloadCard();
    }
}

localCart();
show(products);
