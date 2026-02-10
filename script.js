// =============================
// PRODUITS (tu peux en ajouter)
// =============================
const PRODUCTS = [
  {
    id: "slv-001",
    name: "Sleeves Premium Mat (100)",
    category: "sleeves",
    price: 6.90,
    stock: "ok",
    blurb: "Sleeves mates anti-reflets sans PVC."
  },
  {
    id: "slv-002",
    name: "Perfect Fit (100)",
    category: "sleeves",
    price: 4.50,
    stock: "ok",
    blurb: "Protection interne pour double-sleeving."
  },
  {
    id: "bin-001",
    name: "Classeur 9 Poches (360 cartes)",
    category: "binders",
    price: 24.90,
    stock: "ok",
    blurb: "Classeur zippé haute qualité."
  },
  {
    id: "acr-001",
    name: "Boîtier Acrylique Magnétique",
    category: "acrylic",
    price: 19.90,
    stock: "low",
    blurb: "Protection premium pour cartes rares."
  },
  {
    id: "con-001",
    name: "Top Loaders (x25)",
    category: "consumables",
    price: 9.90,
    stock: "ok",
    blurb: "Protection rigide standard."
  },
  {
    id: "con-002",
    name: "Team Bags (x100)",
    category: "consumables",
    price: 7.90,
    stock: "ok",
    blurb: "Sachets refermables pour envoi."
  }
];

// =============================
// VARIABLES
// =============================
const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");

let cart = {}; // {id: quantity}

// =============================
// FORMAT €
const eur = n =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

// =============================
// AFFICHAGE PRODUITS
// =============================
function renderProducts() {
  grid.innerHTML = "";

  PRODUCTS.forEach(p => {
    const article = document.createElement("article");
    article.className = "card product";

    article.innerHTML = `
      <div class="thumb"></div>
      <h4>${p.name}</h4>
      <p>${p.blurb}</p>
      <div class="row">
        <div>
          <div class="price">${eur(p.price)}</div>
          <div class="stock">${p.stock === "ok" ? "En stock" : "Stock faible"}</div>
        </div>
        <button class="btn primary">Ajouter</button>
      </div>
    `;

    article.querySelector("button").addEventListener("click", () => addToCart(p.id));
    grid.appendChild(article);
  });
}

// =============================
// PANIER
// =============================
function addToCart(id) {
  if (!cart[id]) cart[id] = 0;
  cart[id]++;
  renderCart();
  openCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function changeQty(id, delta) {
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function renderCart() {
  cartBody.innerHTML = "";
  let total = 0;
  let qty = 0;

  Object.keys(cart).forEach(id => {
    const product = PRODUCTS.find(p => p.id === id);
    const q = cart[id];
    const price = product.price * q;

    total += price;
    qty += q;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="mini"></div>
      <div style="flex:1;">
        <h4>${product.name}</h4>
        <p class="meta">${eur(product.price)}</p>
        <div class="row">
          <div class="qty">
            <button>-</button>
            <span>${q}</span>
            <button>+</button>
          </div>
          <button class="btn">Retirer</button>
        </div>
      </div>
    `;

    const [minus, plus] = div.querySelectorAll(".qty button");
    minus.onclick = () => changeQty(id, -1);
    plus.onclick = () => changeQty(id, 1);
    div.querySelector(".btn").onclick = () => removeFromCart(id);

    cartBody.appendChild(div);
  });

  cartCount.textContent = qty;
  cartTotal.textContent = eur(total);
}

// =============================
// DRAWER
// =============================
function openCart() {
  cartDrawer.classList.add("open");
}
function closeCart() {
  cartDrawer.classList.remove("open");
}

document.getElementById("cartBtn").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;

// =============================
// CHECKOUT DEMO
// =============================
document.getElementById("checkoutBtn").onclick = () => {
  if (Object.keys(cart).length === 0) {
    alert("Panier vide !");
    return;
  }
  alert("Commande simulée ✔️");
};

// =============================
// INIT
// =============================
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
