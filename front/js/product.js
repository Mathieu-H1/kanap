// récupération de l'id du produit pour l'écrire dans la page produit 
const str = window.location.href;
const url = new URL(str);
const currentId = url.searchParams.get("id");

// création variable pour page api ensemble produits, et une autre pour la page d'un produit 
const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentId;

/*  - écrire variable pour cibler l'élément dans le HTML et pour définir les autres besoins
    - envoyer requête avec fech pour avoir les données désirées
    - si la réponse est ok, on transforme la réponse en format json
    - les valeurs que l'on a, nous allons les "entrer" dans le DOM
    - si il y a une erreur, la console nous affichera le message d'erreur : "Une erreur est survenue
    + description de l'erreur"  */

fetch(productPage)
    .then(function(res) {
        if (res.ok) {
            return res.json();
    }
})
    .then(function(data) {

        const productImage = document.querySelector(".item__img");
        productImage.innerHTML = `<img src= ${data.imageUrl} alt= "${data.altTxt}">`; 

        const productName = document.getElementById("title");
        productName.innerText = `${data.name}`;

        const productPrice = document.getElementById("price");
        productPrice.innerHTML = `${data.price}`;

        const productDescription = document.getElementById("description");
        productDescription.innerText = `${data.description}`;
        
        let colors = data.colors;    
        colors.forEach((element) => {
            let color = document.getElementById("colors");
            color.innerHTML += `<option value="${element}">${element}</option>`;
        })
    })

/*  logique fonctionnelle
    1) en cliquant sur le bouton    (on cible l'élément dans le html | on écoute l'évènement)  
    2) je veux récupérer la couleur choisie, le nombre d'article, l'id produit  (on cible l'élément dans le html | on récupère la valeur)
    3) s'assurrer que l'utilisateur a bien choisi une couleur
    4) si l'utilisateur a un nbre <1 , afficher un message lui disant +1    (condition si la quantité est <1 -> message d'alerte)
    5) j'aimerai les stocker    */

let productAddToCart = document.getElementById("addToCart");
productAddToCart.addEventListener("click", function() {
    //console.log(currentId)

let productAddColor = document.getElementById("colors")
    //console.log(colors.value);
    if (colors.value = colors.value) {}
    else {    
            alert("veuillez choisir une couleur");
    }

let productAddQuantity = document.getElementById("quantity")
    //console.log(quantity.value);
    if (quantity.value < 1 ) {
        alert("veuillez choisir une quantité")
    }

let product = {id:currentId, quantity:quantity.value, colors:colors.value}
    //console.log(product)

/*  1) recupérer le panier (panier)
    2) créer le panier (arrayCart : tableau vide pour éviter d'effacer à chaque fois le produit)
    3) ajouter produit au tableau
    4) panier à mettre dans le local storage    */

let cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
        console.log(cart);
        
    if (cart === null) { 
            console.log("Cart is empty!");
        cart = [];
        firstAdd();
            console.log(cart);
        return;      
    }

let search_in_cart = cart.find(element => element.id === product.id && element.colors === product.colors);
    console.log(search_in_cart);
    
/* fonction remplacer objet existant
    retirer objet meme id et color
    ajoute produit (qté déjà modifié) 
    faire autre fct 
*/
    if (!search_in_cart) {
            console.log(!search_in_cart);
        firstAdd();
            console.log(cart);

    } else if (search_in_cart) {
            console.log(cart);
        const indexOfSameProductInCart = cart.indexOf (search_in_cart);
            console.log(indexOfSameProductInCart);
        
            if (indexOfSameProductInCart !==-1) {
                cart [indexOfSameProductInCart] = {id: currentId, quantity: parseInt(quantity.value) + parseInt(search_in_cart.quantity), colors: colors.value}
                let jsonCart = JSON.stringify(cart);
                let setCart = window.localStorage.setItem("cart", jsonCart);
            }
            console.log (search_in_cart.quantity);
            console.log (product.quantity);
            console.log (cart);
        
    } 
    
function firstAdd () {
    cart.push(product);
        //console.log(cart);
    let jsonCart = JSON.stringify(cart);
    let setCart = window.localStorage.setItem("cart", jsonCart);
    }
})
