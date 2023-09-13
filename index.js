let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Cadbury dairy milk',
        image: 'img11',
        price: 120
    },
    {
        id: 2,
        name: 'Cadbury Shots',
        image: 'img2',
        price: 120
    },
    {
        id: 3,
        name: 'Cadbury Strawberry punch',
        image: 'img12',
        price: 220
    },
    {
        id: 4,
        name: 'Cadbury Blueberry mix',
        image: 'img13',
        price: 123
    },
    {
        id: 5,
        name: 'Cadbury Litchi',
        image: 'img14',
        price: 320
    },
    {
        id: 6,
        name: 'Cadbury 5star',
        image: 'img10',
        price: 120
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} Rs/-</div>
            <button onclick="addToCard(${key})">Try this</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (!listCards[key]) {
        // If the product isn't in the cart, add it with quantity 1
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else if (listCards[key].quantity < 8) {
        // If the product is in the cart and quantity is less than 8, increment the quantity
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    Object.keys(listCards).forEach((key) => {
        const value = listCards[key];
        totalPrice += value.price * value.quantity;
        count += value.quantity;

        if (value) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity < 8 ? value.quantity + 1 : 8})" ${value.quantity >= 8 ? 'disabled' : ''}>+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}