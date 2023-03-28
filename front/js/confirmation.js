const page = window.location.href;
const url = new URL(page);
const idNumber = url.searchParams.get("id");

const searchId = document.getElementById("orderId");
searchId.innerHTML = idNumber;

localStorage.clear();
