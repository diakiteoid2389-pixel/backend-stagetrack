// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  
  waitForConnections : true,
  connectionLimit    : 10,       // suffisant pour tester
  queueLimit         : 0,
  connectTimeout     : 10000     // 10 secondes max
};

let pool;

// Test rapide de connexion au démarrage (très utile pour debug)
(async () => {
  try {
    // First, connect without database to create it if needed
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // Create database if it doesn't exist
    await tempConnection.execute('CREATE DATABASE IF NOT EXISTS db_stagetrack');
    await tempConnection.end();

    // Now create pool with database
    pool = mysql.createPool({
      ...dbConfig,
      database: process.env.DB_NAME
    });

    // Test the pool
    const conn = await pool.getConnection();
    console.log('→ MySQL connecté avec succès → db_stagetrack');
    conn.release();
  } catch (err) {
    console.error('Erreur connexion MySQL :', err.message);
    console.log('Le serveur continuera sans DB. Vérifiez la configuration MySQL.');
    // process.exit(1); // comment out to not exit
  }
})();

module.exports = pool;