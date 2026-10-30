
const categories = [
  {
    title: "👑 أغراض السيرفر",
    products: [
      { name: "تفعيل فوري", price: "1.00" },
      { name: "رتبة VIP", price: "1.00" }
    ]
  },
  {
    title: "🎮 أشياء الماب",
    products: [
      { name: "سلاح خفيف", price: "1.50" },
      { name: "سلاح ثقيل", price: "2.00" },
      { name: "مقر شرطة أو عصابة", price: "5.00" }
    ]
  }
];

const container = document.getElementById("products");

container.innerHTML = categories.map(category => `
  <section class="category">
    <h2>${category.title}</h2>
    <div class="product-grid">
      ${category.products.map(product => `
        <article class="product">
          <h3>${product.name}</h3>
          <p>${product.price} ريال</p>
          <button onclick="buy('${product.name}')">
            شراء الآن
          </button>
        </article>
      `).join("")}
    </div>
  </section>
`).join("");

function buy(name) {
  alert(
    "المنتج: " + name +
    "\nلإتمام الطلب يرجى التواصل مع إدارة BRAVE TOWN"
  );
}

