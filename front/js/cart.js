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
    form.addEventListener("submit", function () {
        let contact = {
            prenom: "",
            nom: "",
            adresse: "",
            ville: "",
            email: "",
        };

        //! à voir avec Camille
        //!                         /^[a-zA-Z].{1}+[-{0,2}||[a-zA-Z].{1,19}/g  
        //! commence par une lettre (min ou maj) PUIS soit (0 ou 1 ou 2) tiret ou lettre (min ou maj) et ceci 19 caractères

        //! pour adresse mail affiche une erreur mais pas la mienne pkoi ?

        //! ne détecte pas d'erreur s'il y a un @ (prénom, nom, ville)  -> location.reload ???
        function formFirstName() {
            let inputFirstName = document.getElementById("firstName");
            let minFirstName = inputFirstName.setAttribute("minlength", "2");
            let maxFirstName = inputFirstName.setAttribute("maxlength", "20");
            let chaineFirstName = inputFirstName.value;
            let masqueFirstName = /[a-zA-Z]/g;

            if (chaineFirstName.match(masqueFirstName)) {
                contact.prenom = chaineFirstName;
            } else {
                alert("Prénom : la valeur du champs doit être comprise entre 2 et 20 lettres");
            }
        }
        formFirstName();

        function formLastName() {
            let inputLastName = document.getElementById("lastName");
            let minLastName = inputLastName.setAttribute("minlength", "2");
            let maxLastName = inputLastName.setAttribute("maxlength", "20");
            let chaineLastName = inputLastName.value;
            let masqueLastName = /[a-zA-Z]/g;

            if (chaineLastName.match(masqueLastName)) {
                contact.nom = chaineLastName;
            } else {
                alert("Nom : la valeur du champs doit être comprise entre 2 et 20 lettres");
            }
        }
        formLastName();

        function formAddress() {
            let inputAddress = document.getElementById("address");
            let chaineAddress = inputAddress.value;
            let masqueAddress = /[\\D+ || \\d]+\\d+[ ||,||[A-Za-z0-9.-]]+(?:[Rue|Avenue|Chemin|... etcd|Ln|St]+[ ]?)+(?:[A-Za-z0-9.-](.*)]?)/;

            if (chaineAddress.match(masqueAddress)) {
                contact.adresse = chaineAddress;
            } else {
                alert("Adresse non valide");
            }
        }
        formAddress();

        function formCity() {
            let inputCity = document.getElementById("city");
            let minCity = inputCity.setAttribute("minlength", "2");
            let maxCity = inputCity.setAttribute("maxlength", "20");
            let chaineCity = inputCity.value;
            let masqueCity = /[a-zA-Z]/g;

            if (chaineCity.match(masqueCity)) {
                contact.ville = chaineCity;
            } else {
                alert("Ville : la valeur du champs doit être comprise entre 2 et 20 lettres");
            }
        }
        formCity();

        function formEmail() {
            let inputEmail = document.getElementById("email");
            let chaineEmail = inputEmail.value;
            let masqueEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (chaineEmail.match(masqueEmail)) {
                contact.email = chaineEmail;
            } else {
                alert("Email non valide");
            }
        }
        formEmail();

    })
    function createArrayOfProducts() {
        let arrayOfProducts = [];
        let searchArticle = document.querySelectorAll("article");
        let searchId = searchArticle.dataset.id;
        arrayOfProducts.push(searchId);
    }
    createArrayOfProducts()
}
formulaire();
