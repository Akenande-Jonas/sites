// server.js
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

// Charger les variables d'environnement depuis un fichier .env si présent
try {
  require('dotenv').config();
} catch (e) {
  // dotenv est optionnel — si non installé, on continue
}

const app = express();
const PORT = 8000;

// Configuration de la base de données (avec valeurs par défaut)
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0
};

let db = null;
let dbAvailable = false;

// Vérifications rapides et messages d'aide
if (!dbConfig.database) {
  console.warn("Avertissement: aucune base de données configurée (DB_NAME vide). L'API renverra 503 pour les routes dépendantes de la DB.");
}

if (dbConfig.user === 'root' && !dbConfig.password) {
  console.warn("Avertissement: connexion avec l'utilisateur 'root' sans mot de passe — si MySQL demande un mot de passe, la connexion échouera. Définissez DB_USER et DB_PASSWORD dans un fichier .env ou en variables d'environnement.");
}

try {
  db = mysql.createPool(dbConfig);
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:');
      console.error(err);

      // Message d'aide selon le code d'erreur
      if (err.code === 'ECONNREFUSED') {
        console.error('Connexion refusée. Vérifiez que le service MySQL tourne et que DB_HOST/DB_PORT sont corrects. Exemple: systemctl start mysql');
      } else if (err.code === 'ER_ACCESS_DENIED_ERROR' || err.code === 'ER_ACCESS_DENIED_NO_PASSWORD_ERROR') {
        console.error("Accès refusé: vérifiez l'utilisateur/mot de passe MySQL. Exemple .env:\nDB_HOST=127.0.0.1\nDB_USER=monuser\nDB_PASSWORD=monpassword\nDB_NAME=mondb");
      }

      dbAvailable = false;
    } else {
      console.log('Connecté à la base de données MySQL');
      dbAvailable = true;
      connection.release();
    }
  });
} catch (e) {
  console.error("Impossible d'initialiser la connexion MySQL:", e.message || e);
  dbAvailable = false;
}

// Middleware
// Servir le front-end depuis le dossier sibling `front-end`
const FRONTEND_DIR = path.join(__dirname, '..', 'front-end');
app.use(express.static(FRONTEND_DIR));
app.use(express.json());

// EMPÊCHER LE CACHE (Important pour le GPS temps réel)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Route pour récupérer les dernières données GPS
app.get('/api/gps/latest', (req, res) => {
  /*
  * CORRECTION DÉFINITIVE DU TRI :
  * On ne peut pas trier par 'id'. On utilise donc CONCAT() et TRIM()
  * pour créer une valeur DATETIME propre à partir de Date et Heure_UTC,
  * même si l'un d'eux contient des espaces invisibles.
  */
  const query = `
    SELECT
      Date,
      Heure_UTC,
      Latitude,
      Longitude
    FROM gps
    ORDER BY CONCAT(Date, ' ', TRIM(Heure_UTC)) DESC
    LIMIT 1
  `;

  console.log('Requête reçue: /api/gps/latest');

  if (!dbAvailable) {
    return res.status(503).json({ error: 'Base de données indisponible' });
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      return res.status(500).json({
        error: 'Erreur serveur',
        details: err.message
      });
    }

    console.log('Résultats:', results);

    if (results.length === 0) {
      console.log('Aucune donnée trouvée');
      return res.status(404).json({ error: 'Aucune donnée trouvée' });
    }

    console.log('Données envoyées:', results[0]);
    res.json(results[0]);
  });
});

// Route pour récupérer toutes les positions (optionnel)
app.get('/api/gps/all', (req, res) => {
  // Application de la même logique de tri pour l'historique
  const query = `
    SELECT
      Date,
      Heure_UTC,
      Latitude,
      Longitude
    FROM gps
    ORDER BY CONCAT(Date, ' ', TRIM(Heure_UTC)) DESC
    LIMIT 100
  `;

  console.log('Requête reçue: /api/gps/all');

  if (!dbAvailable) {
    return res.status(503).json({ error: 'Base de données indisponible' });
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      return res.status(500).json({
        error: 'Erreur serveur',
        details: err.message
      });
    }

    console.log(`${results.length} enregistrements trouvés`);
    res.json(results);
  });
});

// Route de test pour vérifier les tables
app.get('/api/test', (req, res) => {
  const query = 'SHOW TABLES';

  if (!dbAvailable) {
    return res.status(503).json({ error: 'Base de données indisponible' });
  }

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'Erreur',
        details: err.message
      });
    }
    res.json({ tables: results });
  });
});

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`API disponible sur http://localhost:${PORT}/api/gps/latest`);
});