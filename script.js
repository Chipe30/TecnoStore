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

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
    showToast(`${name} agregado al carrito`);
  });
});

function updateCart() {
  cartItemsList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ${item.price} x ${item.quantity}
      <button class="remove-btn" data-index="${index}">Eliminar</button>
    `;

    cartItemsList.appendChild(li);
  });

  // Activar botones de eliminar
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
      showToast("Producto eliminado del carrito");
    });
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
