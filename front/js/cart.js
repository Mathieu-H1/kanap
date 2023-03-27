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

//* qté totale des produits dans le panier ---> ok
function totalCartQuantity() {
    let cartQuantity = 0;
    let productsQties = document.querySelectorAll(".itemQuantity"); // renvoit un tableau donc boucle for
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

//* supprimer un objet dans le panier et le local storage ---> ok
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

//* changer la quantité d'un objet dans le local storage ---> ok
function changeQty() {
    let inputChangeQties = document.querySelectorAll(".itemQuantity");
    // console.log(inputChangeQties);

    for (let inputChangeQty of inputChangeQties) {
        inputChangeQty.addEventListener("change", function () {
            let newProductQty = inputChangeQty.value;
            // console.log(newProductQty);
            totalCartQuantity();
            totalCartPrice();

            let searchArticle = inputChangeQty.closest("article");
            // console.log(searchArticle);
            let searchId = searchArticle.dataset.id;
            // console.log(searchId);
            let searchColor = searchArticle.dataset.color;
            // console.log(searchColor);

            var cart;
            cart = window.localStorage.getItem("cart");
            cart = JSON.parse(cart);

            let elementToChange = cart.find(el => el.id == searchId || el.colors == searchColor);
            // console.log(elementToChange);
            elementToChange.quantity = newProductQty;
            let jsonCart = JSON.stringify(cart);
            let setCart = window.localStorage.setItem("cart", jsonCart);
        })
    }
}

//* Formulaire
function formulaire() {
    let form = document.querySelector("form");
    // console.log(form);
    form.addEventListener("submit", function (e) {
        let contact = {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            email: "",
        };
        let arrayOfProducts = [];   // création du tableau ou l'on met les id produit

        //* fonction générique pour toutes les entrées
        function inputValues(idInput, mask, element) {
            let input = document.getElementById(idInput);
            input.setAttribute("minlength", "2");
            input.setAttribute("maxlength", "20");
            let chain = input.value;

            if (chain.match(mask)) {
                contact[element] = chain;
                // console.log(contact);
                return true;
            } else {
                e.preventDefault();
                return false;
            }
        }
        if (!inputValues("firstName", /^[A-Za-z]+$/, "firstName")) {
            alert("Prénom : la valeur du champs doit être comprise entre 2 et 20 lettres");
            return;
        }
        if (!inputValues("lastName", /^[A-Za-z]+$/, "lastName")) {
            alert("Nom : la valeur du champs doit être comprise entre 2 et 20 lettres");
            return;
        }
        if (!inputValues("address", /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/, "address")) {
            alert("Adresse non valide");
            return;
        }
        if (!inputValues("city", /^[A-Za-z]+$/, "city")) {
            alert("Nom : la valeur du champs doit être comprise entre 2 et 20 lettres");
            return;
        }
        if (!inputValues("email", /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email")) {
            alert("Email non valide");
            return;
        }

        let searchArticles = document.querySelectorAll("article");
        for (let searchArticle of searchArticles) {
            let searchId = searchArticle.dataset.id;
            arrayOfProducts.push(searchId);
            
            // var cart;
            // cart = window.localStorage.getItem("cart");
            // cart = JSON.parse(cart);
            // const arrayOfProducts = cart.map(item => item.id);
            console.log(arrayOfProducts);

            //* fc° récupérer l'identifiant de la commande   
            // requete json contenant (contact et arrayOfProducts) envoyée au serveur
            const userForm = {
                contact,
                products: arrayOfProducts,
            }
            console.log(userForm);

            async function collectOrderId() {
                e.preventDefault();
                let response = await fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify(userForm),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                let result = await response.json();
                console.log(result);
            }
            collectOrderId();
        }
    })
}
formulaire();

// let response = await fetch('/article/fetch/post/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });