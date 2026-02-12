const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

// Servir les fichiers statiques publics et le dossier d'images
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Connexion à MariaDB
const db = mysql.createConnection({
  host: "127.0.0.1",   // plus sûr que "localhost"
  user: "root",        // ou val_user si créé
  password: "passer",  // mets ton vrai mot de passe
  database: "valentine_db"
});

// Tester la connexion
db.connect((err) => {
  if (err) {
    console.error("Erreur connexion DB :", err);
  } else {
    console.log("Connecté à MariaDB");
  }
});

// Route racine -> page de login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Pages supplémentaires
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/ask", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ask.html"));
});
app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "gallery.html"));
});

// Route récupérer messages (si table créée)
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});
