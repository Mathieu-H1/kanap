/*
- écrire variables pour cibler l'élément dans le HTML et pour définir les autres besoins
- envoyer requête avec fech pour avoir les données déxirées
- si la réponse est ok, on transforme la réponse en format json
- les valeurs que l'on a, nous allons les "entrer" dans le DOM
- si il y a une erreur, la console nous affichera le message d'erreur :"Une erreur est survenue"
*/

//création variable pour cibler l'id dans index.html + une variable canapes
let items = document.getElementById("items")
let canapes = ""

//envoi requête afin d'avoir les données produit + les inclure das html
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
})
    .then(function(value) {
        console.log(value);
        for(let canape of value) {
            items.innerHTML += `
                <a href="./product.html?id=${canape._id}">
                    <article>
                        <img src= "${canape.imageUrl}" alt="${canape.altTxt}">
                        <h3 class="productName">${canape.name}</h3>
                        <p class="productDescription">${canape.description}</p>
                    </article>
                </a>            `
        }        
})
    .catch(function(err) {
        console.log("Une erreur est survenue", err);
        })

