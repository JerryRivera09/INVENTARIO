const express = require("express");
const router = express.Router();
const db = require("../bd/db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json(results);
  });
});

// POST
router.post("/", (req, res) => {
  const { name, price, stock } = req.body;

  db.query(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
        return;
      }

      res.json({
        id: result.insertId,
        name,
        price,
        stock,
      });
    },
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json({ message: "Producto eliminado" });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body;

  db.query(
    "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
    [name, price, stock, id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
        return;
      }

      res.json({ message: "Producto actualizado" });
    },
  );
});

module.exports = router;
