// récupérer les données du local storage ok
// reconvertir la chaîne en objet (JSON.parse)

let cart = window.localStorage.getItem("cart");
cart = JSON.parse(cart);
    console.log(cart);

// parcourir le tableau (for each)

cart.forEach((element) => {
    const apiProductsUrl = "http://localhost:3000/api/products/";
    const productPage = apiProductsUrl + element.id;
        // console.log(productPage)

fetch(productPage)
    .then(function (res) {
        if (res.ok) {
        return res.json();
        } 
    })

// cibler la balise en html / créer l'élément en html 
// écrire chaque donnée dans l'élément correspondant

    .then(function (data) {
        // console.log(data);

        const addInfoProduct = document.getElementById("cart__items");
        addInfoProduct.innerHTML += `
        <article class="cart__item" data-id="${element.id}" data-color="${element.colors}">
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

let cartQuantity = 0;   // 1* qté totale des produits dans le panier           ---> ok
let productPrice = 0;   // 2* prix par produit = prix produit unitaire * qté   ---> ok
let cartPrice = 0;     // 3* montant total du panier                          ---> 

for(let i = 0; i < cart.length; i++) {
    
    cartQuantity = parseInt(cartQuantity) + parseInt(cart[i].quantity); // 1*
    let addQuantityTotalProducts = document.getElementById("totalQuantity");
    addQuantityTotalProducts.innerHTML = cartQuantity;
        // console.log(cartQuantity);
    }
    productPrice = parseInt(data.price) * parseInt(element.quantity); // 2*
        // console.log(productPrice);
    
                            // à partir de là bloqué

    cartPrice = parseInt(cartPrice) + parseInt(productPrice);
        console.log(cartPrice);
    let addTotalPriceProducts = document.getElementById("totalPrice");
    addTotalPriceProducts.innerHTML = cartPrice;
})
})







// en cliquant sur le bouton (on cible l'élément dans le html | on écoute l'évènement)




// on cible l'id de l'élément dans le html

    
