//* récupérer les données du local storage + reconvertir la chaîne en objet
var cart;

function getCart() {
    cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
    console.log(cart);
}
getCart();

let data;
cart.forEach((element) => {
    // console.log(element);
    const apiProductsUrl = "http://localhost:3000/api/products/";   // url avec ttes les données au format json
    const productPage = apiProductsUrl + element.id;

    async function collectData() {      // fc° récupérer les données donc attendre que fetch s’exécute => await devant fetch
        data = await fetch(productPage) // requete "GET" est de base
        // console.log(data);

        if (!data.ok) {              //* si problème de chargement, on affiche erreur
            alert("Un problème est survenu");
        } else {
            data = await data.json();    // on attend que la requete soit finie et transforme le json en objet js

            const addInfoProduct = document.getElementById("cart__items");
            addInfoProduct.innerHTML += `
    <article class="cart__item" data-id="${element.id}" data-color="${element.colors}" data-price="${data.price}">
    <div class="cart__item__img">
        <img src= ${data.imageUrl} alt= "${data.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>"${element.colors}"</p>
            <p>${data.price}€</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>`;
            //* appels des fonctions
            totalCartQuantity();
            totalCartPrice(data.price * element.quantity);
            deleteProduct();
        }
    }
    collectData();
})

//! qté totale des produits dans le panier  ---> ok
function totalCartQuantity() {
    let cartQuantity = 0;
    let productsQties = document.querySelectorAll(".itemQuantity");
    // console.log(productQties);

    for (let productQty of productsQties) {
        cartQuantity += parseInt(productQty.value);
        // console.log(cartQuantity);
        let addtotalCartQuantity = document.getElementById("totalQuantity");
        addtotalCartQuantity.innerHTML = cartQuantity;
    }
}

//! montant total du panier ---> ok
let cartPrice = 0;
function totalCartPrice(price) {
    cartPrice += price;
    // console.log(cartPrice);
    let addTotalCartPrice = document.getElementById("totalPrice");
    addTotalCartPrice.innerHTML = cartPrice;
}

//! supprimer un objet dans le panier et le local storage ---> supprime un objet fc° puis NOK
function deleteProduct() {
    let canapes = document.getElementsByClassName("deleteItem");

    for (let deleteCanape of canapes) {
        deleteCanape.addEventListener("click", function () {
            let searchArticle = deleteCanape.closest("article");
            // console.log(searchArticle);
            let searchId = searchArticle.dataset.id;
            // console.log(searchId);
            let searchColor = searchArticle.dataset.color;
            // console.log(searchColor);
            let elToKeep = cart.filter(el => el.id !== searchId || el.colors !== searchColor);
            // console.log(elToKeep);
            cartUpdateDelete(elToKeep);
            searchArticle.remove();

        })
        function cartUpdateDelete(x) {   // màj du panier dans le local storage
            localStorage.clear();
            let cart = [];
            cart.push(x);
            console.log(cart);
            let jsonCart = JSON.stringify(cart);
            let setCart = window.localStorage.setItem("cart", jsonCart);
        }
    }
}

//! changer la quantité d'un objet dans le panier et le local storage ---> NOK
function changeQty() {
    let inputMoveQty = document.getElementsByClassName("itemQuantity");
    console.log(inputMoveQty);
    inputMoveQty.addEventListener("change", function () {
console.log(inputMoveQty.value);
    })
}
changeQty();
