
const products = [
  {
    name: "رتبة مميزة",
    price: 25
  },
  {
    name: "مقر عصابة",
    price: 50
  }
];

const container = document.getElementById("products");

container.innerHTML = products.map(product => `
  <div class="product">
    <h3>${product.name}</h3>
    <p>${product.price} ريال</p>
    <button onclick="buy('${product.name}')">
      شراء
    </button>
  </div>
`).join("");

function buy(name) {
  alert("طلبك: " + name + " تواصل مع الإدارة لإتمام الشراء");
}
