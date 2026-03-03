//================= importation des modules ================
const express = require('express');
const pm2 = require('pm2');
const os = require('os');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 2500;

//================= configuration de l'application ================
app.use(express.json());
app.use(cors()); // Permet les requêtes cross-origin (CORS) pour toutes les routes

//================= middleware ================
app.use(bodyParser.json()); // décode le body d'une requête
app.use(bodyParser.urlencoded({ extended: true })); // décode les données d'un formulaire
app.use(express.static('public')); // sert les fichiers statiques du dossier 'public'      

//================= gestion des routes pour les produits ===========
app.get('/', (req, res) => {
  res.json('Bienvenu sur le server du tp 2!');
});

app.post('/test', (req, res) => {
  const donneesDuCorps = req.body;
  console.log(donneesDuCorps);
  res.json({message: 'Données reçues et traitées !', donnees: donneesDuCorps});
});

app.get('/test', (req, res) => {
  res.json('Message bien reçu !');
});

//================= gestion de PM2 pour le processus de l'application ==============
pm2.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à PM2:', err);
    process.exit(2);
  }

  pm2.start({
    script: 'application.js', // Le fichier de votre application
    name: 'tp2-app', // Nom du processus
    exec_mode: 'cluster', // Mode d'exécution en cluster
    instances: 1, // Nombre d'instances à lancer
    autorestart: true, // Redémarrer automatiquement en cas de crash
  }, (err, apps) => {
    pm2.disconnect(); // Déconnecter PM2 après le démarrage

    if (err) {
      console.error('Erreur lors du démarrage de l\'application avec PM2:', err);
      return;
    }

    console.log('Application démarrée avec PM2:', apps);
  });
});

//================= demarrage du serveur avec le port ==============

// Démarrer le serveur
const server = app.listen(port, () => {
  //console.log(os.networkInterfaces());
  console.log(`Serveur est en écoute sur      
                ${os.networkInterfaces()['ens18'][0].address}:${port}`);
});

//================= fin du TP 2 ==============