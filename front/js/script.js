let items = document.getElementById("items")
let canapes = ""

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
                        <img src= "${canape.imageUrl}" alt="Lorem ipsum dolor sit amet, ${canape.name}">
                        <h3 class="productName">${canape.name}</h3>
                        <p class="productDescription">${canape.description}</p>
                    </article>
                </a>            `
        }        
        })
    .catch(function(err) {
        console.log("Une erreur est survenue", err);
        })

