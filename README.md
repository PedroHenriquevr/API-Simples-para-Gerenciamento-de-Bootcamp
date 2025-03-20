# API de Gerenciamento de Bootcamp

Uma API simples para gerenciamento de alunos e cursos em um bootcamp.

## Requisitos

- Node.js
- PostgreSQL
- NPM ou Yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:

   ```pwsh
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:

   ```env
   DB_USER=seu_usuario
   DB_HOST=localhost
   DB_NAME=nome_do_banco
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   PORT=3000
   ```

4. Inicie o servidor:

   ```pwsh
   npm start
   ```

## Funcionalidades

- Criação automática do banco de dados na primeira execução
- Dados de teste são inseridos automaticamente se o banco de dados estiver vazio
- API REST para gerenciamento de alunos e cursos

## Endpoints

### Alunos

#### Listar todos os alunos

- **URL**: `/api/alunos`
- **Método**: `GET`
- **Resposta de Sucesso**: Status 200

  ```json
  [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao.silva@email.com",
      "idade": 25,
      "created_at": "2025-06-10T14:00:00.000Z"
    },
    {
      "id": 2,
      "nome": "Maria Oliveira",
      "email": "maria.oliveira@email.com",
      "idade": 23,
      "created_at": "2025-06-10T14:00:00.000Z"
    }
  ]
  ```

#### Cadastrar novo aluno

- **URL**: `/api/alunos`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "nome": "Pedro Santos",
    "email": "pedro.santos@email.com",
    "idade": 28
  }
  ```

- **Resposta de Sucesso**: Status 201

  ```json
  {
    "id": 3,
    "nome": "Pedro Santos",
    "email": "pedro.santos@email.com",
    "idade": 28,
    "created_at": "2025-06-10T15:00:00.000Z"
  }
  ```

### Cursos

#### Listar todos os cursos

- **URL**: `/api/cursos`
- **Método**: `GET`
- **Resposta de Sucesso**: Status 200

  ```json
  [
    {
      "id": 1,
      "nome": "Desenvolvimento Web Full Stack",
      "descricao": "Curso completo de desenvolvimento web front-end e back-end",
      "duracao": 120,
      "created_at": "2025-06-10T14:00:00.000Z"
    },
    {
      "id": 2,
      "nome": "Data Science",
      "descricao": "Fundamentos de ciência de dados e machine learning",
      "duracao": 80,
      "created_at": "2025-06-10T14:00:00.000Z"
    }
  ]
  ```

#### Cadastrar novo curso

- **URL**: `/api/cursos`
- **Método**: `POST`
- **Corpo da Requisição**:

  ```json
  {
    "nome": "DevOps",
    "descricao": "Fundamentos de DevOps e CI/CD",
    "duracao": 60
  }
  ```

- **Resposta de Sucesso**: Status 201

  ```json
  {
    "id": 3,
    "nome": "DevOps",
    "descricao": "Fundamentos de DevOps e CI/CD",
    "duracao": 60,
    "created_at": "2025-06-10T15:00:00.000Z"
  }
  ```

## Banco de dados

A API utiliza um banco de dados PostgreSQL com as seguintes tabelas:

### Tabela alunos

- `id`: SERIAL PRIMARY KEY
- `nome`: VARCHAR(100)
- `email`: VARCHAR(100) UNIQUE
- `idade`: INTEGER
- `created_at`: TIMESTAMP

### Tabela cursos

- `id`: SERIAL PRIMARY KEY
- `nome`: VARCHAR(100)
- `descricao`: TEXT
- `duracao`: INTEGER
- `created_at`: TIMESTAMP
