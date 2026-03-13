const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", routes);

// servir frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});

// GET
app.get('/products', (req, res) => {
    res.json(products);
});

// POST
app.post('/products', (req, res) => {
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    products.push(newProduct);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
    res.json(newProduct);
});

// DELETE
app.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
    res.json({ message: "Producto eliminado" });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
