// ==================================================
// script.js — Loja Gamer (vanilla JS)
// - Produtos são definidos na array `PRODUCTS` abaixo
// - Atualize links e imagens diretamente nesta array
// - Para usar um link padrão em todos os produtos, altere `DEFAULT_AFFILIATE`
// ==================================================

const DEFAULT_AFFILIATE = 'https://amzn.to/3RjAPvR';

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Teclado Mecânico RGB Pro',
    price: 459.90,
    rating: 4.7,
    img: 'assets/p1.svg',
    link: DEFAULT_AFFILIATE
  },
  {
    id: 'p2',
    name: 'Mouse Gamer Óptico 16000 DPI',
    price: 269.00,
    rating: 4.5,
    img: 'assets/p2.svg',
    link: DEFAULT_AFFILIATE
  },
  {
    id: 'p3',
    name: 'Headset Wireless 7.1',
    price: 689.50,
    rating: 4.8,
    img: 'assets/p3.svg',
    link: DEFAULT_AFFILIATE
  }
];

/* --- Utils --- */
const money = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const $ = sel => document.querySelector(sel);

/* --- Render produtos --- */
function renderProducts(){
  const container = $('#products');
  container.innerHTML = '';
  PRODUCTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card glass';
    card.innerHTML = `
      <div class="media"><img loading="lazy" src="${p.img}" alt="${p.name}"></div>
      <div class="product-info">
        <h4>${p.name}</h4>
        <div class="price">${money(p.price)}</div>
        <div class="rating">${'★'.repeat(Math.round(p.rating))} <span class="muted">${p.rating}</span></div>
      </div>
      <div class="product-actions">
        <a class="btn buy" href="${p.link}" target="_blank">Comprar na Amazon</a>
        <button class="btn" onclick="addToCart('${p.id}')">Adicionar</button>
      </div>
      <div class="affiliate-highlight">
        <span>Link oficial de afiliado:</span>
        <a href="${p.link}" target="_blank">${p.link}</a>
      </div>
    `;
    container.appendChild(card);
  });
}

/* --- Carrinho --- */
function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  CART[id] = CART[id] ? {...CART[id], qty: CART[id].qty + 1} : {...p, qty:1};
  updateCartUI();
}
function removeFromCart(id){
  if(!CART[id]) return;
  CART[id].qty--;
  if(CART[id].qty<=0) delete CART[id];
  updateCartUI();
}
function updateCartUI(){
  const items = $('#cart-items');
  items.innerHTML = '';
  const keys = Object.keys(CART);
  let subtotal = 0;
  keys.forEach(k=>{
    const it = CART[k];
    subtotal += it.price * it.qty;
    const div = document.createElement('div');
    div.className = 'cart-item glass';
    div.innerHTML = `
      <img loading="lazy" src="${it.img}" alt="${it.name}">
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center"><strong>${it.name}</strong><div class="muted">${money(it.price)}</div></div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
          <button class="btn" onclick="removeFromCart('${k}')">-</button>
          <div>${it.qty}x</div>
          <button class="btn" onclick="addToCart('${k}')">+</button>
          <a class="btn outline" href="${it.link}" target="_blank">Ir à Amazon</a>
        </div>
      </div>
    `;
    items.appendChild(div);
  });
  $('#cart-subtotal').textContent = money(subtotal);
  $('#cart-count').textContent = keys.reduce((s,k)=>s + CART[k].qty,0) || 0;
  // Se houver produtos, usa o link do primeiro item; caso contrário, fallback para o link padrão
  $('#checkout').href = keys.length ? Object.values(CART)[0].link : DEFAULT_AFFILIATE;
  try{ localStorage.setItem('cs_cart_v1', JSON.stringify(CART)); }catch(e){ /* ignorar */ }
}

/* --- UI interactions --- */
document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  // carregar carrinho salvo (persistência simples)
  const saved = localStorage.getItem('cs_cart_v1');
  if(saved){ try{ CART = JSON.parse(saved); }catch(e){ CART = {} } }
  updateCartUI();
  $('#year').textContent = new Date().getFullYear();

  // Loading screen
  setTimeout(()=>{document.getElementById('loading').style.display='none'},800);

  // Hamburger animado e menu mobile
  $('#hamburger').addEventListener('click',()=>{
    const nav = $('#nav-links');
    nav.classList.toggle('open');
    $('#hamburger').classList.toggle('active');
    const expanded = $('#hamburger').classList.contains('active');
    $('#hamburger').setAttribute('aria-expanded', expanded);
  });

  // Cart open/close
  $('#cart-btn').addEventListener('click',()=>{document.getElementById('cart').classList.add('open')});
  $('#cart-close').addEventListener('click',()=>{document.getElementById('cart').classList.remove('open')});

  // clicar fora fecha o carrinho
  document.addEventListener('click',(e)=>{
    const cartEl = document.getElementById('cart');
    if(!cartEl.classList.contains('open')) return;
    const clickedCart = e.target.closest && e.target.closest('#cart');
    const clickedBtn = e.target.closest && e.target.closest('#cart-btn');
    if(!clickedCart && !clickedBtn){ cartEl.classList.remove('open'); }
  });

  // fechar nav quando redimensionar para desktop
  window.addEventListener('resize',()=>{ if(window.innerWidth>600){ document.getElementById('nav-links').classList.remove('open'); document.getElementById('hamburger').classList.remove('active'); } });

  // Back to top
  const bt = $('#backTop');
  window.addEventListener('scroll',()=>{bt.style.display = window.scrollY>400?'block':'none'});
  bt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Simple parallax on hero image
  const heroImg = document.querySelector('.hero-image img');
  window.addEventListener('mousemove',e=>{
    const x = (e.clientX - window.innerWidth/2)/80;
    const y = (e.clientY - window.innerHeight/2)/80;
    if(heroImg) heroImg.style.transform = `translate(${x}px,${y}px)`;
  });

  // Close nav when link clicked (mobile)
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{document.getElementById('nav-links').classList.remove('open')}));

  // Initialize particles
  initParticles();
});

/* --- Particles --- */
function initParticles(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w=canvas.width=innerWidth;let h=canvas.height=innerHeight;let particles=[];
  function onResize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight}
  addEventListener('resize',onResize);
  function spawn(){
    particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,r:Math.random()*1.8+0.3,c:Math.random()<0.5? '#33d2ff':'#9b5cff'});
    if(particles.length>120) particles.shift();
  }
  for(let i=0;i<80;i++)spawn();
  function loop(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;
      ctx.beginPath();ctx.fillStyle=p.c;ctx.globalAlpha=0.7;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    });
    // connect
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j];const dx=a.x-b.x,dy=a.y-b.y;const d=dx*dx+dy*dy;if(d<9000){ctx.strokeStyle='rgba(155,92,255,0.06)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
    requestAnimationFrame(loop);
  }
  loop();
}

/* --- Expose functions to global for inline onclick --- */
window.addToCart = addToCart;window.removeFromCart = removeFromCart;
