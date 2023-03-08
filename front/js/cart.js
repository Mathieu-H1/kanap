//* récupérer les données du local storage + reconvertir la chaîne en objet
var cart;

function getCart() {
    cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
    console.log(cart);
}

//* qté totale des produits dans le panier    ---> ok
var cartQuantity = 0;

function totalCartQuantity() {
    for (let i = 0; i < cart.length; i++) {
        cartQuantity = parseInt(cartQuantity) + parseInt(cart[i].quantity); // 1*
        let addtotalCartQuantity = document.getElementById("totalQuantity");
        addtotalCartQuantity.innerHTML = cartQuantity;
        // console.log(cartQuantity);
    }
}
var cartPrice = 0;

getCart();
// console.log(cart);

var data;
cart.forEach((element) => {
    console.log(element);
    const apiProductsUrl = "http://localhost:3000/api/products/";   // url avec ttes les données au format json
    const productPage = apiProductsUrl + element.id;

    async function collectData() {      // fc° récupérer les données donc attendre que fetch s’exécute => await devant fetch
        data = await fetch(productPage) // requete "GET" est de base
        // console.log(data);

        if (!data.ok) {              //* si problème de chargement, on affiche erreur
            alert("Un problème est survenu");
        } else {
            data = await data.json();    // on attend que la requete soit finie et transforme le json en objet js
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
        }

        //* prix par produit = prix produit unitaire * qté  ---> ok

        function totalProductPrice() {
            productPrice = parseInt(data.price) * parseInt(element.quantity);
            // console.log(productPrice);
        }
        totalProductPrice();

        //* montant total du panier ---> ok

        function totalCartPrice() {
            cartPrice += productPrice;
            console.log(cartPrice);
            let addTotalCartPrice = document.getElementById("totalPrice");
            addTotalCartPrice.innerHTML = cartPrice;
        }
        totalCartPrice();
    }
    collectData();
})

totalCartQuantity();

//* supprimer un objet dans le panier et le local storage

function deleteProduct() {
    let buttonDelete = document.getElementsByClassName("deleteItem");
    console.log(buttonDelete);
    buttonDelete.addEventListener("click", function () {
        let searchArticle = buttonDelete.closest("article");    // cible les données du canapé -> dans l'article du dessus (dom)
        console.log(searchArticle);
        let searchId = searchArticle.dataset.id;    // on récupère l' id
        console.log(searchId);
        let searchColor = searchArticle.dataset.color;  // on récupère la couleur
        console.log(searchColor);
        let result = cart.filter(el => el.id !== searchId || el.colors !== searchColor);    // filtre si id ou couleur de l'élément est différent
        console.log(result);
        searchArticle.remove(); // retire l'élément du dom
        cartUpdateDelete(); // 
    })
}
deleteProduct();

function cartUpdateDelete() {   // màj du panier dans le local storage
    cart.push(result);
    let jsonCart = JSON.stringify(cart);
    let setCart = window.localStorage.setItem("cart", jsonCart);
}

//     let deleteCanape = document.getElementsByClassName("deleteItem");       // on cible l'élément pur supprimer dans le dom
//     console.log(deleteCanape);
//     let canapes = cart.length;
//     console.log(canapes)
//     for (let deleteCanape of canapes) {
//         deleteCanape.addEventListener("click", function () {           // on écoute l'évènement click

//             let searchArticle = deleteCanape.closest("article");       // afin de récupérer les données (canapé que l'on veut supprimer) dans l'article du dessus (dom)
//             console.log(searchArticle);
//             let searchId = searchArticle.dataset.id;                    // on récupère l' id
//             console.log(searchId);
//             let searchColor = searchArticle.dataset.color;              // on récupère la couleur
//             console.log(searchColor);
//             let result = cart.filter(el => el.id !== searchId || el.colors !== searchColor);
//             console.log(result);
//             searchArticle.remove();
//             cartUpdateDelete();                                         // on supprime l'article dans le dom
//         })
//     }
//     for (let canape of canapes) {
//         let quantity = document.getElementsByName("itemQuantity");
//         quantity.addEventListener("change", (event) => {                  // évènement change
//             //let edit = ;
//         })
//     }

//     function cartUpdateDelete() {
//         cart.push(result);
//         console.log(result);
//         let jsonCart = JSON.stringify(cart);
//         let setCart = window.localStorage.setItem("cart", jsonCart);
//     }
// }


    // je récupère l'id, la quantité  (on cible l'élément dans le html | on récupère la valeur)
    //let getelementId = deleteProduct.closest("article.data-id")

    // modifier une quantité (dom et local storage)



    // cart.forEach((element) => {
    //     const apiProductsUrl = "http://localhost:3000/api/products/";
    //     const productPage = apiProductsUrl + element.id;

    //     fetch(productPage)
    //         .then(function (res) {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //         })
    //         .then(function (data) {

    //             const addInfoProduct = document.getElementById("cart__items");
    //             addInfoProduct.innerHTML += `
    // <article class="cart__item" data-id="${element.id}" data-color="${element.colors}">
    //     <div class="cart__item__img">
    //         <img src= ${data.imageUrl} alt= "${data.altTxt}">
    //     </div>
    //     <div class="cart__item__content">
    //         <div class="cart__item__content__description">
    //             <h2>${data.name}</h2>
    //             <p>"${element.colors}"</p>
    //             <p>${data.price}€</p>
    //         </div>
    //         <div class="cart__item__content__settings">
    //             <div class="cart__item__content__settings__quantity">
    //                 <p>Qté : </p>
    //                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
    //             </div>
    //             <div class="cart__item__content__settings__delete">
    //                 <p class="deleteItem">Supprimer</p>
    //             </div>
    //         </div>
    //     </div>
    // </article>`;
