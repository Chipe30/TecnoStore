const cartButton = document.getElementById("cart-button");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.getElementById("cart-items");
const toast = document.getElementById("toast");

let cart = [];

cartButton.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const name = productCard.querySelector("h4").textContent;
    const price = productCard.querySelector("p").textContent;
    cart.push({ name, price });
    updateCart();
    showToast(`${name} agregado al carrito`);
  });
});

function updateCart() {
  cartItemsList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price}`;
    cartItemsList.appendChild(li);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
