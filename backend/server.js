// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes"); // Importa las rutas CRUD
const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas para /products
app.use("/products", routes);

// Servir frontend
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
