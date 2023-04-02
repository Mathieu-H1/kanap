function finalization() {
const page = window.location.href;
const url = new URL(page);
const idNumber = url.searchParams.get("id");

const searchId = document.getElementById("orderId");    // affichage numéro de commande
searchId.innerHTML = idNumber;

localStorage.clear();   // effacer le local storage
}
finalization();