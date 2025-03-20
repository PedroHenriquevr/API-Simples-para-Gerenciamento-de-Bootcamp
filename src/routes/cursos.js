const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Listar todos os cursos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cursos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cadastrar novo curso
router.post('/', async (req, res) => {
  const { nome, descricao, duracao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cursos (nome, descricao, duracao) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, duracao]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 