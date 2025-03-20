const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

async function createTables() {
  try {
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );
    
    console.log('Criando tabelas no banco de dados...');
    await pool.query(schemaSQL);
    console.log('Tabelas criadas com sucesso!');
    
    return true;
  } catch (error) {
    console.error('Erro ao criar tabelas:', error.message);
    if (error.message.includes('already exists')) {
      console.log('As tabelas já existem, continuando...');
      return true;
    }
    return false;
  }
}

async function insertSampleData() {
  try {
    const alunosCount = await pool.query('SELECT COUNT(*) FROM alunos');
    const cursosCount = await pool.query('SELECT COUNT(*) FROM cursos');
    
    if (alunosCount.rows[0].count > 0 || cursosCount.rows[0].count > 0) {
      console.log('Já existem dados no banco, pulando inserção de dados de teste.');
      return;
    }
    
    const alunosData = [
      {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        idade: 25
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@email.com',
        idade: 23
      }
    ];
    
    for (const aluno of alunosData) {
      await pool.query(
        'INSERT INTO alunos (nome, email, idade) VALUES ($1, $2, $3)',
        [aluno.nome, aluno.email, aluno.idade]
      );
    }
    
    const cursosData = [
      {
        nome: 'Desenvolvimento Web Full Stack',
        descricao: 'Curso completo de desenvolvimento web front-end e back-end',
        duracao: 120
      },
      {
        nome: 'Data Science',
        descricao: 'Fundamentos de ciência de dados e machine learning',
        duracao: 80
      }
    ];
    
    for (const curso of cursosData) {
      await pool.query(
        'INSERT INTO cursos (nome, descricao, duracao) VALUES ($1, $2, $3)',
        [curso.nome, curso.descricao, curso.duracao]
      );
    }
    
    console.log('Dados de teste inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados de teste:', error.message);
  }
}

async function initDatabase() {
  console.log('Inicializando banco de dados...');
  
  const tablesCreated = await createTables();
  
  if (tablesCreated) {
    await insertSampleData();
    console.log('Inicialização do banco de dados concluída!');
  } else {
    console.log('Falha na inicialização do banco de dados.');
  }
}

module.exports = initDatabase;

if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('Processo de inicialização concluído.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Erro no processo de inicialização:', err);
      process.exit(1);
    });
}
