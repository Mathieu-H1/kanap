/*
- écrire variables pour cibler l'élément dans le HTML et pour définir les autres besoins
- envoyer requête avec fech pour avoir les données déxirées
- si la réponse est ok, on transforme la réponse en format json
- les valeurs que l'on a, nous allons les "entrer" dans le DOM
- si il y a une erreur, la console nous affichera le message d'erreur : "Une erreur est survenue
+ description de l'erreur"
*/

//récupération de l'id du produit pour l'écrire dans la page produit 
const str = window.location.href;
const url = new URL(str)
const currentId = url.searchParams.get("id");

const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentId;

fetch(productPage)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
})
    .then(function(data) {
        //console.log(data);

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

/*      logique fonctionnelle
1) en cliquant sur le bouton 
2) je veux récupérer la couleur choisie, le nombre d'articles, l'id produit
3) s'assurrer que l'utilisateur a bien choisi une couleur
4) idem pour un nbre d'article > à 0
5) si l'utilisateur a un nbre <1 , afficher un message lui disant +1
6) j'aimerai les stocker */

let productAddToCart = document.getElementById("addToCart");
productAddToCart.addEventListener("click", function() {
    console.log(currentId)

let productAddQuantity = document.getElementById("quantity")
    console.log(quantity.value);
    if (quantity.value < 1 ) {
    alert("veuillez choisir une quantité")
    }

let product = {id:currentId, quantity:quantity.value}
    console.log(product)

/*  1) recupérer le panier
2) créer le panier (tableau vide pour éviter d'effacer à chaque fois le produit)
3) ajouter produit au tableau
4) panier à mettre dans le local storage    */

localStorage.setItem("product", JSON.stringify(product));    

})

/*  1) stockage
2) récupérer le panier
3) ajouter les valeurs dans le panier
4) sauvegarder le panier avec les produits dedans
*/

