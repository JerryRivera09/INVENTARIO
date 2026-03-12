const API = "http://10.0.2.18:3000/products";

async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p) => {
    list.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>$${p.price}</td>
            <td>${p.stock}</td>
            <td>
                <button onclick="editProduct(${p.id})">Editar</button>
                <button onclick="deleteProduct(${p.id})">Eliminar</button>
            </td>
        </tr>
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
}

function searchProduct() {
  const text = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const name = row.children[0].textContent.toLowerCase();

    if (name.includes(text)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
  loadProducts();
}
//EDITAR
async function editProduct(id) {
  const name = prompt("Nuevo nombre:");
  const price = prompt("Nuevo precio:");
  const stock = prompt("Nuevo stock:");

  if (!name || !price || !stock) {
    alert("Debes llenar todos los campos");
    return;
  }

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      stock: stock,
    }),
  });

  loadProducts();
}

async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  loadProducts();
}

loadProducts();
