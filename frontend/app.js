const API = "/products";

async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p) => {
    list.innerHTML += `
            <li>
                ${p.name} - $${p.price} - Stock: ${p.stock}
                <button onclick="deleteProduct(${p.id})">Eliminar</button>
            </li>
        `;
  });
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, stock }),
  });

  loadProducts();
}

async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadProducts();
}

loadProducts();
