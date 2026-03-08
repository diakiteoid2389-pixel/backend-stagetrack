// server.js
require('dotenv').config();
const express = require('express');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// Route racine de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Serveur Express démarré !',
    database: 'db_stagetrack'
  });
});

// Route de test connexion DB
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultat');
    res.json({ 
      success: true, 
      message: 'Connexion DB OK', 
      test: rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// (Ajoute tes autres routes ici plus tard)

app.listen(PORT, () => {
  console.log(`Serveur lancé → http://localhost:${PORT}`);
  console.log('Teste ces URLs :');
  console.log(`  → http://localhost:${PORT}/`);
  console.log(`  → http://localhost:${PORT}/test-db`);
});