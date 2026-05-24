// ======================================================
// CYBER SHOP - SCRIPT COMPLETO E CORRIGIDO
// Loja Gamer + Afiliados Amazon
// ======================================================

// ======================================================
// LINKS AFILIADOS REAIS
// ======================================================

const ICAMPER_LINK = 'https://amzn.to/43w6xZi';
const AMAZON_GERAL = 'https://amzn.to/3RjAPvR';

// ======================================================
// STORAGE
// ======================================================

const STORAGE_CART_KEY = 'cybershop_cart';

// ======================================================
// PRODUTOS
// IMPORTANTE:
// Coloque as imagens reais dentro da pasta:
// assets/
// ======================================================

const PRODUCTS = [

  {
    id: 'p1',

    name: 'iClamper Pocket Energia 5',

    price: 89.90,

    rating: 4.9,

    category: 'Proteção',

    badge: 'Mais vendido',

    img: 'assets/iclamp.webp',

    link: ICAMPER_LINK
  },

  {
    id: 'p2',

    name: 'Teclado Mecânico Gamer RGB',

    price: 299.90,

    rating: 4.8,

    category: 'Teclados',

    badge: 'RGB Premium',

    img: 'assets/keyboard.webp',

    link: AMAZON_GERAL
  },

  {
    id: 'p3',

    name: 'Mouse Gamer Ultra RGB',

    price: 159.90,

    rating: 4.7,

    category: 'Mouse',

    badge: 'Alta Precisão',

    img: 'assets/mouse.webp',

    link: AMAZON_GERAL
  },

  {
    id: 'p4',

    name: 'Headset Gamer RGB',

    price: 249.90,

    rating: 4.8,

    category: 'Headsets',

    badge: 'Som Imersivo',

    img: 'assets/headset.webp',

    link: AMAZON_GERAL
  }

];

// ======================================================
// CARRINHO
// ======================================================

let CART = {};

// ======================================================
// HELPERS
// ======================================================

const $ = selector => document.querySelector(selector);

const money = value =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

    name: 'Teclado Mecânico Gamer RGB',
    price: 299.90,
    priceLabel: 'R$ 299,90 — Comprar na Amazon',
    rating: 4.8,
    category: 'Teclados',
    badge: 'RGB Premium',
    img: 'assets/keyboard.svg',
    link: 'https://amzn.to/4v7eK22'
  setTimeout(() => {

    const loading = $('#loading');

    if (loading) {

      loading.style.opacity = '0';

      setTimeout(() => {

        loading.style.display = 'none';

      }, 500);

    }

  }, 1200);

});

// ======================================================
// GERAR ESTRELAS
// ======================================================

function generateStars(rating) {

  return '★'.repeat(Math.floor(rating));

}

// ======================================================
// RENDERIZAR PRODUTOS
// ======================================================

function renderProducts() {

  const container = $('#products');

  if (!container) return;

  container.innerHTML = '';

  PRODUCTS.forEach(product => {

    const card = document.createElement('article');

    card.className = 'product-card glass fade-up';

    card.innerHTML = `

      <div class="product-badge">

        ${product.badge}

      </div>

      <div class="product-image">

        <img
          src="${product.img}"
          alt="${product.name}"
          loading="lazy"
        >

      </div>

      <div class="product-info">

        <span class="product-category">

          ${product.category}

        </span>

        <h4>

          ${product.name}

        </h4>

        <div class="rating">

          ${generateStars(product.rating)}

          <span>${product.rating}</span>

        </div>

        <div class="price">

          ${money(product.price)}

        </div>

        <div class="product-buttons">

          <!-- BOTÃO AMAZON -->

          <a
            href="${product.link}"
            target="_blank"
            class="btn primary"
          >

            Comprar

          </a>

          <!-- CARRINHO -->

          <button
            class="btn outline"
            onclick="addToCart('${product.id}')"
          >

            +

          </button>

        </div>

      </div>

    `;

    container.appendChild(card);

  });

}

// ======================================================
// ADICIONAR AO CARRINHO
// ======================================================

function addToCart(id) {

  const product = PRODUCTS.find(
    product => product.id === id
  );

  if (!product) return;

  if (CART[id]) {

    CART[id].qty++;

  } else {

    CART[id] = {

      ...product,

      qty: 1

    };

  }

  updateCartUI();

  showToast('Produto adicionado ao carrinho');

}

// ======================================================
// REMOVER CARRINHO
// ======================================================

function removeFromCart(id) {

  if (!CART[id]) return;

  CART[id].qty--;

  if (CART[id].qty <= 0) {

    delete CART[id];

  }

  updateCartUI();

}

// ======================================================
// ATUALIZAR CARRINHO
// ======================================================

function updateCartUI() {

  const itemsContainer = $('#cart-items');

  const subtotalElement = $('#cart-subtotal');

  const countElement = $('#cart-count');

  const checkout = $('#checkout');

  if (!itemsContainer) return;

  itemsContainer.innerHTML = '';

  let subtotal = 0;

  let count = 0;

  Object.values(CART).forEach(item => {

    subtotal += item.price * item.qty;

    count += item.qty;

    const div = document.createElement('div');

    div.className = 'cart-item glass';

    div.innerHTML = `

      <img
        src="${item.img}"
        alt="${item.name}"
      >

      <div class="cart-item-info">

        <h5>

          ${item.name}

        </h5>

        <p>

          ${money(item.price)}

        </p>

        <div class="cart-controls">

          <button
            onclick="removeFromCart('${item.id}')"
          >
            -
          </button>

          <span>

            ${item.qty}

          </span>

          <button
            onclick="addToCart('${item.id}')"
          >
            +
          </button>

        </div>

      </div>

    `;

    itemsContainer.appendChild(div);

  });

  subtotalElement.textContent = money(subtotal);

  countElement.textContent = count;

  checkout.href = AMAZON_GERAL;

  localStorage.setItem(
    STORAGE_CART_KEY,
    JSON.stringify(CART)
  );

}

// ======================================================
// TOAST
// ======================================================

function showToast(message) {

  const toast = document.createElement('div');

  toast.className = 'toast';

  toast.innerHTML = `

    ✅ ${message}

  `;

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.classList.add('show');

  }, 100);

  setTimeout(() => {

    toast.classList.remove('show');

    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 2500);

}

// ======================================================
// MENU MOBILE
// ======================================================

function initMobileMenu() {

  const hamburger = $('#hamburger');

  const nav = $('#nav-links');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {

    hamburger.classList.toggle('active');

    nav.classList.toggle('open');

  });

}

// ======================================================
// CARRINHO ABRIR/FECHAR
// ======================================================

function initCart() {

  const cartBtn = $('#cart-btn');

  const cart = $('#cart');

  const closeBtn = $('#cart-close');

  if (!cartBtn || !cart || !closeBtn) return;

  cartBtn.addEventListener('click', () => {

    cart.classList.add('open');

  });

  closeBtn.addEventListener('click', () => {

    cart.classList.remove('open');

  });

}

// ======================================================
// BOTÃO VOLTAR AO TOPO
// ======================================================

function initBackToTop() {

  const button = $('#backTop');

  if (!button) return;

  window.addEventListener('scroll', () => {

    if (window.scrollY > 400) {

      button.style.display = 'flex';

    } else {

      button.style.display = 'none';

    }

  });

  button.addEventListener('click', () => {

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  });

}

// ======================================================
// PARTÍCULAS
// ======================================================

function initParticles() {

  const canvas = document.getElementById('particles');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let particles = [];

  function resize() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

  }

  resize();

  window.addEventListener('resize', resize);

  class Particle {

    constructor() {

      this.x = Math.random() * canvas.width;

      this.y = Math.random() * canvas.height;

      this.size = Math.random() * 2;

      this.speedX = (Math.random() - 0.5) * 0.5;

      this.speedY = (Math.random() - 0.5) * 0.5;

    }

    update() {

      this.x += this.speedX;

      this.y += this.speedY;

    }

    draw() {

      ctx.fillStyle = '#33d2ff';

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

      ctx.fill();

    }

  }

  for (let i = 0; i < 100; i++) {

    particles.push(new Particle());

  }

  function animate() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(particle => {

      particle.update();

      particle.draw();

    });

    requestAnimationFrame(animate);

  }

  animate();

}

// ======================================================
// CARREGAR CARRINHO
// ======================================================

function loadCart() {

  const saved = localStorage.getItem(
    STORAGE_CART_KEY
  );

  if (!saved) return;

  try {

    CART = JSON.parse(saved);

  } catch {

    CART = {};

  }

}

// ======================================================
// INICIAR
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

  renderProducts();

  loadCart();

  updateCartUI();

  initMobileMenu();

  initCart();

  initBackToTop();

  initParticles();

  // ANO FOOTER

  const year = $('#year');

  if (year) {

    year.textContent = new Date().getFullYear();

  }

});

// ======================================================
// GLOBAL
// ======================================================

window.addToCart = addToCart;

window.removeFromCart = removeFromCart;
