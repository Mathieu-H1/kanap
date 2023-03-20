//* récupérer les données du local storage + reconvertir la chaîne en objet
function getCart() {
    var cart;
    cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
    console.log(cart);
    cart.forEach((element) => {
        // console.log(element);
        const apiProductsUrl = "http://localhost:3000/api/products/";   // url avec ttes les données au format json
        const productPage = apiProductsUrl + element.id;

        async function collectData() {      // fc° récupérer les données donc attendre que fetch s’exécute => await devant fetch
            let data;
            data = await fetch(productPage) // requete "GET" est de base
            // console.log(data);

            if (!data.ok) { //* si problème de chargement, on affiche erreur
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
                totalCartPrice();
                deleteProduct();
                changeQty();
            }
        }
        collectData();
    })
}
getCart();



//* qté totale des produits dans le panier  ---> ok
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

//* montant total du panier ---> ok 
function totalCartPrice() {
    let cartPrice = 0;
    let searchQties = document.querySelectorAll(".itemQuantity");
    for (let searchQty of searchQties) {
        let canapQty = searchQty.value;
        // console.log(canapQty);
        let searchArticle = searchQty.closest("article");
        // console.log(searchArticle);
        let canapPrice = searchArticle.dataset.price;
        // console.log(canapPrice);
        cartPrice += parseInt(canapPrice) * parseInt(canapQty);
        // console.log(cartPrice);
        let addTotalCartPrice = document.getElementById("totalPrice");
        addTotalCartPrice.innerHTML = cartPrice;
    }
}

//* supprimer un objet dans le panier et le local storage
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

            var cart;
            cart = window.localStorage.getItem("cart");
            cart = JSON.parse(cart);
            let elToKeep = cart.filter(el => el.id !== searchId || el.colors !== searchColor);
            // console.log(elToKeep);

            searchArticle.remove();
            totalCartQuantity();
            totalCartPrice();
            cartUpdateDelete(elToKeep);
            location.reload();
        })
        function cartUpdateDelete(cart) {   // màj du panier dans le local storage
            localStorage.clear();
            console.log(cart);
            let jsonCart = JSON.stringify(cart);
            let setCart = window.localStorage.setItem("cart", jsonCart);
        }
    }
}

//! changer la quantité d'un objet dans le local storage ---> NOK
function changeQty() {
    let inputMoveQties = document.getElementsByClassName("itemQuantity");
    // console.log(inputMoveQties);

    for (let inputMoveQty of inputMoveQties)
        inputMoveQty.addEventListener("change", function () {
            let newProductQty = inputMoveQty.value;
            console.log(newProductQty);
            totalCartQuantity();
            totalCartPrice();
        })
}

//* Formulaire
let contact = {};

function formFirstName() {
    let inputFirstName = document.getElementById("firstName");
    let minFirstName = inputFirstName.setAttribute("minlength", "2");
    let maxFirstName = inputFirstName.setAttribute("maxlength", "20");
    let chaineFirstName = inputFirstName.value;
    let masque01 = /[A-Z]/;     //! à voir pour remplacer les deux masques par 1 seul [a-zA-Z]
    let masque02 = /[a-z]/;
    if (chaineFirstName == chaineFirstName.match(masque01) || chaineFirstName == chaineFirstName.match(masque02)) {
        //! envoie value dans l'objet contact
    } else {
        alert("La valeur du champs doit être comprise entre 2 et 20 lettres")
    }
}
formFirstName();

function formLastName() {
    let inputLastName = document.getElementById("lastName");
    let minLastName = inputLastName.setAttribute("minlength", "2");
    let maxLastName = inputLastName.setAttribute("maxlength", "20");
    let chaineLastName = inputLastName.value;
    let masque03 = /[A-Z]/;
    let masque04 = /[a-z]/;
    if (chaineLastName == chaineLastName.match(masque03) || chaineLastName == chaineLastName.match(masque04)) {
        //! envoie value dans l'objet contact
    } else {
        alert("La valeur du champs doit être comprise entre 2 et 20 lettres")
    }
}
formLastName();

function formAdress() {
    let inputAdress = document.getElementById("address");
// str.match('([0-9a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)');
}
formAdress();


function formCity() {
    let inputCity = document.getElementById("city");
    let minCity = inputCity.setAttribute("minlength", "2");
    let maxCity = inputCity.setAttribute("maxlength", "20");
    let chaineCity = inputCity.value;
    let masque03 = /[A-Z]/;
    let masque04 = /[a-z]/;
    if (chaineCity == chaineCity.match(masque03) || chaineCity == chaineCity.match(masque04)) {
        //! envoie value dans l'objet contact
    } else {
        alert("La valeur du champs doit être comprise entre 2 et 20 lettres")
    }
}
formCity();

function formEmail() {
    let inputEmail = document.getElementById("email");
}
formEmail();