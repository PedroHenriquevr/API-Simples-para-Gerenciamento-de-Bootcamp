const express = require('express');
const cors = require('cors');
require('dotenv').config();
const initDatabase = require('./database/init');

const app = express();

app.use(cors());
app.use(express.json());

initDatabase()
  .then(() => console.log('Banco de dados inicializado'))
  .catch(err => console.error('Erro ao inicializar o banco de dados:', err));

app.use('/api/alunos', require('./routes/alunos'));
app.use('/api/cursos', require('./routes/cursos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});