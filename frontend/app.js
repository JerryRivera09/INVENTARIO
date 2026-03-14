const API = "http://localhost:3000/products";

async function loadProducts() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Error al cargar productos");
    const products = await res.json();

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach((p) => {
      list.innerHTML += `
        <tr id="product-${p.id}">
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
  } catch (error) {
    console.error("Error:", error);
    alert("Error al cargar los productos");
  }
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value, 10);

  if (!name || isNaN(price) || isNaN(stock)) {
    alert("Todos los campos son requeridos y deben ser números válidos");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, stock }),
    });

    if (!res.ok) throw new Error("Error al agregar producto");

    // Limpiar formulario
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";

    await loadProducts();
  } catch (error) {
    console.error("Error:", error);
    alert("Error al agregar el producto");
  }
}

function searchProduct() {
  const text = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#productList tr");

  rows.forEach((row) => {
    const name = row.children[0]?.textContent.toLowerCase() || "";
    row.style.display = name.includes(text) ? "" : "none";
  });
}

async function editProduct(id) {
  const name = prompt("Nuevo nombre:");
  const price = parseFloat(prompt("Nuevo precio:"));
  const stock = parseInt(prompt("Nuevo stock:"), 10);

  if (!name || isNaN(price) || isNaN(stock)) {
    alert("Debes llenar todos los campos con valores válidos");
    return;
  }

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, stock }),
    });

    if (!res.ok) throw new Error("Error al editar producto");
    await loadProducts();
  } catch (error) {
    console.error("Error:", error);
    alert("Error al editar el producto");
  }
}

async function deleteProduct(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) return;

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar producto");
    await loadProducts();
  } catch (error) {
    console.error("Error:", error);
    alert("Error al eliminar el producto");
  }
}

// Cargar productos al iniciar
document.addEventListener("DOMContentLoaded", loadProducts);
