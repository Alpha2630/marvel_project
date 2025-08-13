const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./heroes.json";


const loadHeroes = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

const saveHeroes = (heroes) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(heroes, null, 2));
};

app.get("/heroes", (req, res) => {
  res.json(loadHeroes());
});


app.post("/heroes", (req, res) => {
  const heroes = loadHeroes();
  const newHero = { id: Date.now(), ...req.body };
  heroes.push(newHero);
  saveHeroes(heroes);
  res.json(newHero);
});


app.put("/heroes/:id", (req, res) => {
  const heroes = loadHeroes();
  const id = parseInt(req.params.id);
  const updatedHeroes = heroes.map((h) =>
    h.id === id ? { id, ...req.body } : h
  );
  saveHeroes(updatedHeroes);
  res.json({ message: "Héros mis à jour" });
});
app.delete("/heroes/:id", (req, res) => {
  const heroes = loadHeroes();
  const id = parseInt(req.params.id);
  const updatedHeroes = heroes.filter((h) => h.id !== id);
  saveHeroes(updatedHeroes);
  res.json({ message: "Héros supprimé" });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
