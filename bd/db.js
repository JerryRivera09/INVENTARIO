const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "inventario-db.c4noiqemgjse.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "admin123", // tu contraseña
  database: "inventario",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }

  console.log("Conectado a MySQL");
});

module.exports = db;
