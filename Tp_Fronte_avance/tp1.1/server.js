// declaration des modules
const express = require("express");

//creation de l'application express
const app = express();
const port = 8000; //definir le port

// les middlewares
app.use(express.json());

//message de demarrage
console.log("Coucou je suis ton server cacher");

//recupere tous les utilisateurs
app.get("/users", (req, res) => {
  res.json(users);
});

//ecoute le port de server
app.listen(port, () => {
  console.log(`Server ecoute le http://172.29.19.28:${port}`);
});

// fin du code