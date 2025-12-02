const express = require('express'); // chargé le module express 
const app = express(); // appel au constructeur express

const path = require('path'); // module path pour gérer les chemins de fichiers

app.use(express.static(path.join(__dirname,"..","front"))); // définir le dossier static (front)

// définir une route GET pour la racine ( / c'est la racine)
app.get('/', (req, res) => {
    res.send(path.join(__dirname,"..","front")); // envoyer le fichier index.html du dossier front
});

// définir une route GET pour /api/test
app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionne!' }); // envoyer une réponse JSON
});

// démarrer le serveur (sur le port défini et une fonction annonyme)
app.listen(5001, () => {
    console.log(`Server est sur le http://172.29.17.171:5000`);
});

module.exports = app;