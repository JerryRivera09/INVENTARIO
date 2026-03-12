// Forzar HTTP explícitamente y asegurar que no haya redirecciones a HTTPS
const API_URL = "http://10.0.2.18:3000";

async function loadProducts() {
  try {
    console.log("Cargando productos desde:", API_URL + "/products");

    const res = await fetch(API_URL + "/products", {
      mode: "cors",
      cache: "no-cache",
      referrerPolicy: "no-referrer-when-downgrade", // Importante para HTTP
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const products = await res.json();
    console.log("Productos cargados:", products);

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
  } catch (error) {
    console.error("Error detallado:", error);
    console.error("URL intentada:", API_URL + "/products");
    console.error("¿El navegador está usando HTTPS?", window.location.protocol);
    alert(`Error al cargar productos. Protocolo: ${window.location.protocol}`);
  }
}

// El resto de funciones (addProduct, editProduct, deleteProduct, searchProduct) igual...
// Pero asegúrate de que usen API_URL + '/products' en lugar de API

loadProducts();
