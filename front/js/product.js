// récupération de l'id du produit pour l'écrire dans la page produit

const str = window.location.href;
const url = new URL(str);
const currentId = url.searchParams.get("id");

// création variable pour page api ensemble produits, et une autre pour la page d'un produit

const apiProductsUrl = "http://localhost:3000/api/products/";
const productPage = apiProductsUrl + currentId;

// envoyer requête avec fech pour avoir les données désirées
// si la réponse est ok, on transforme la réponse en format json

fetch(productPage)
    .then(function (res) {
        if (res.ok) {
        return res.json();
    }
    })

// les valeurs que l'on a, nous allons les "entrer" dans le DOM

    .then(function (data) {
        const productImage = document.querySelector(".item__img");
        productImage.innerHTML = `<img src= ${data.imageUrl} alt= "${data.altTxt}">`;

        const productName = document.getElementById("title");
        productName.innerText = `${data.name}`;

        const name = document.querySelector("title");
        name.innerText = `${data.name}`;

        const productPrice = document.getElementById("price");
        productPrice.innerHTML = `${data.price}`;

        const productDescription = document.getElementById("description");
        productDescription.innerText = `${data.description}`;

        let colors = data.colors;
        colors.forEach((element) => {
            let color = document.getElementById("colors");
            color.innerHTML += `<option value="${element}">${element}</option>`;
        });
    });

                                                //*   logique fonctionnelle   //

// en cliquant sur le bouton (on cible l'élément dans le html | on écoute l'évènement)

let productAddToCart = document.getElementById("addToCart");
productAddToCart.addEventListener("click", function () {

// je récupère la couleur choisie, la quantité  (on cible l'élément dans le html | on récupère la valeur)
// messages d'alertes si couleur non choisie et si quantité <1

    let productAddColor = document.getElementById("colors");
        console.log(colors.value);
    if ((colors.value = colors.value)) {
    } else {
    alert("veuillez choisir une couleur");
    }

    let productAddQuantity = document.getElementById("quantity");
        console.log(quantity.value);
    if (quantity.value < 1) {
    alert("veuillez choisir une quantité");
    }

    let product = {
        id: currentId,
        quantity: quantity.value,
        colors: colors.value,
    };

// récupérer le panier existant

    let cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
        console.log(cart);

// si pas de panier -> créer le panier (arrayCart : tableau vide pour éviter d'effacer à chaque fois le produit)
// ajouter produit au tableau / panier à mettre dans le local storage

    if (cart === null) {
        console.log("Cart is empty!");
        cart = [];
        firstAdd();
            console.log(cart);
        return;
    }

// rechercher si objet (même id et couleur) déjà dans le panier

    let search_in_cart = cart.find((element) => element.id === product.id && element.colors === product.colors);
        console.log(search_in_cart);

// si objet différent -> fonction firstAdd

    if (!search_in_cart) {
        console.log(!search_in_cart);
        firstAdd();
            console.log(cart);

// si objet idem (id + color) -> rechercher l'index / on déclare les valeurs de l'objet
// id + color + addition quantité objet à celle du panier

    } else if (search_in_cart) {
        console.log(cart);
        const indexOfSameProductInCart = cart.indexOf(search_in_cart);
            console.log(indexOfSameProductInCart);

    if (indexOfSameProductInCart !== -1) {
        cart[indexOfSameProductInCart] = {
            id: currentId,
            quantity: parseInt(quantity.value) + parseInt(search_in_cart.quantity),
            colors: colors.value,
        };
    let jsonCart = JSON.stringify(cart);
    let setCart = window.localStorage.setItem("cart", jsonCart);
    }
    console.log(search_in_cart.quantity);
    console.log(product.quantity);
    console.log(cart);
    }

// déclaration fonction -> ajout valeurs objet dans le panier / transformation format Json / envoyer au local storage

    function firstAdd() {
    cart.push(product);
        // console.log(cart);
    let jsonCart = JSON.stringify(cart);
    let setCart = window.localStorage.setItem("cart", jsonCart);
    }
});
