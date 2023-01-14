/*
- écrire variables pour cibler l'élément dans le HTML et pour définir les autres besoins
- envoyer requête avec fech pour avoir les données déxirées
- si la réponse est ok, on transforme la réponse en format json
- les valeurs que l'on a, nous allons les "entrer" dans le DOM
- si il y a une erreur, la console nous affichera le message d'erreur :"Une erreur est survenue"
*/

//récupération de l'id du produit pour l'écrire dans la page produit 
const str = window.location.href;
const url = new URL(str)
const currentId = url.searchParams.get("id");
//console.log(currentId);

const apiProductsUrl = 'http://localhost:3000/api/products/';
const productPage = apiProductsUrl + currentId;

fetch(productPage)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
})
    .then(function(data) {
        console.log(data);

        const productImage = document.querySelector(".item__img");
        productImage.innerHTML = `<img src= ${data.imageUrl} alt= "${data.altTxt}">`; 
            //console.log(productImage) 

        const productName = document.getElementById("title");
        productName.innerText = `${data.name}`;
            //console.log(productName)

        const productPrice = document.getElementById("price");
        productPrice.innerHTML = `${data.price}`;
            //console.log(productPrice)

        const productDescription = document.getElementById("description");
        productDescription.innerText = `${data.description}`;
            //console.log(productDescription)
        

        const colors = data.colors;    
            //console.log(color)
        colors.forEach((element, index) => {
            //console.log(element)
            //console.log(index)
            const productColor = document.getElementById("colors");
            productColor.innerHTML += `<option value="${element}">${element}</option>`;
            //console.log(element)
        })
})


