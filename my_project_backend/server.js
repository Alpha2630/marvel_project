const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./heroes.json";

// Charger les héros
const loadHeroes = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Sauvegarder les héros
const saveHeroes = (heroes) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(heroes, null, 2));
};

// 📌 GET : Liste des héros
app.get("/heroes", (req, res) => {
  res.json(loadHeroes());
});

// 📌 POST : Ajouter un héros
app.post("/heroes", (req, res) => {
  const heroes = loadHeroes();
  const newHero = { id: Date.now(), ...req.body };
  heroes.push(newHero);
  saveHeroes(heroes);
  res.json(newHero);
});

// 📌 PUT : Modifier un héros
app.put("/heroes/:id", (req, res) => {
  const heroes = loadHeroes();
  const id = parseInt(req.params.id);
  const updatedHeroes = heroes.map((h) =>
    h.id === id ? { id, ...req.body } : h
  );
  saveHeroes(updatedHeroes);
  res.json({ message: "Héros mis à jour" });
});

// 📌 DELETE : Supprimer un héros
app.delete("/heroes/:id", (req, res) => {
  const heroes = loadHeroes();
  const id = parseInt(req.params.id);
  const updatedHeroes = heroes.filter((h) => h.id !== id);
  saveHeroes(updatedHeroes);
  res.json({ message: "Héros supprimé" });
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
