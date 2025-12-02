const express = require('express'); // chargé le module express 
const app = express(); // appel au constructeur express

const path = require('path'); // module path pour gérer les chemins de fichiers

app.use(express.static(path.join(__dirname,"..","front"))); // définir le dossier static (front)

// définir une route GET pour la racine ( / c'est la racine)
app.get('/', (req, res) => {
    res.send(path.join(__dirname,"..","front")); // envoyer le fichier index.html du dossier front
});

// définir une route GET pour /api/test
app.get('/api/test', (req, res) => {                    // envoyer une réponse JSON
    res.json({ message: 'API fonctionne!', 
               jonas: 'Coucou Jonas',
               age: 20,
               langages: ['JavaScript', 'html', 'css']
    }); 
});

// démarrer le serveur (sur le port défini et une fonction annonyme)
app.listen(5001, () => {
    console.log(`Server est sur le http://172.29.17.171:5000`);
});

app.post('/api/login', (req, res) => {
    let receivedData = req.body; // Récupérer les données envoyées dans le corps de la requête
    console.log('Données reçues:', receivedData); // Afficher les données reçues dans la console
    res.json({ message: 'Données reçues avec succès!' }); // Envoyer une réponse JSON
});


module.exports = app;