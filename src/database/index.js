const { Client } = require('pg');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
};

async function initializeDatabase() {
  const client = new Client({
    ...dbConfig,
    database: 'postgres',
  });

  try {
    await client.connect();
    const dbName = process.env.DB_NAME || 'alunos_cursos';
    
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]
    );
    
    if (result.rows.length === 0) {
      console.log(`Creating database ${dbName}...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully!`);
    }
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  } finally {
    await client.end();
  }
}

function runMigrations() {
  return new Promise((resolve, reject) => {
    console.log('Running database migrations...');
    
    const configPath = path.resolve(process.cwd(), 'flyway.conf');
    const flyway = spawn('flyway', ['migrate', '-configFiles=' + configPath], {
      stdio: 'inherit',
      shell: true
    });

    flyway.on('close', (code) => {
      if (code === 0) {
        console.log('Migrations completed successfully');
        resolve();
      } else {
        const error = new Error(`Migrations failed with exit code ${code}`);
        console.error(error.message);
        reject(error);
      }
    });
  });
}

async function setupDatabase() {
  try {
    await initializeDatabase();
    await runMigrations();
    return true;
  } catch (err) {
    console.error('Database setup failed:', err);
    return false;
  }
}

module.exports = {
  setupDatabase,
  initializeDatabase,
  runMigrations
}; 