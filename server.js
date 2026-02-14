const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

// Servir les fichiers statiques publics, le dossier d'images et Flower-animation-main
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/Flower-animation-main", express.static(path.join(__dirname, "Flower-animation-main")));

// Database connection removed — not needed for this project.
// (Previously used mysql2 / MariaDB; DB code was removed per request.)

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

// /messages route removed because the app no longer uses a database.

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});
