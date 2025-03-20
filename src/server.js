const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase } = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/alunos', require('./routes/alunos'));
app.use('/api/cursos', require('./routes/cursos'));

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Falha ao inicializar o servidor:', err);
    process.exit(1);
  }
})(); 