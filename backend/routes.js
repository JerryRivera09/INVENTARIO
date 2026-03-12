const express = require('express');
const fs = require('fs');
const router = express.Router();

let products = require('./products.json');

// GET
router.get('/', (req, res) => {
    res.json(products);
});

// POST
router.post('/', (req, res) => {

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
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    products = products.filter(p => p.id != id);

    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));

    res.json({ message: "Producto eliminado" });
});

router.put('/:id', (req, res) => {

    const id = req.params.id;

    products = products.map(p => {
        if (p.id == id) {
            return {
                ...p,
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            };
        }
        return p;
    });

    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));

    res.json({ message: "Producto actualizado" });
});

module.exports = router;