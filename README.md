# API Simples para Gerenciamento de Bootcamp

API REST desenvolvida para o Projeto Integrador - Projeto Desenvolvimento e Projeto de Sistemas Modernos da Unisagrado. Esta aplicação permite gerenciar alunos e cursos de um bootcamp através de operações CRUD.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Flyway (migrações de banco de dados)

## Requisitos

Para executar este projeto, você precisará:

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- Flyway CLI instalado e disponível no PATH

## Instalação e Configuração

1. Clone o repositório:

   ```
   git clone https://github.com/seu-usuario/API-Simples-para-Gerenciamento-de-Bootcamp.git
   cd API-Simples-para-Gerenciamento-de-Bootcamp
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=alunos_cursos
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   PORT=3000
   ```

4. Instale o Flyway CLI:

   - Windows: Baixe o Flyway Command Line Tools do site oficial e adicione ao PATH
   - Linux/Mac: Use o gerenciador de pacotes da sua distribuição ou homebrew

## Executando o Projeto

1. Execute as migrações do banco de dados:

   ```
   npm run migrate
   ```

   Isso criará automaticamente o banco de dados e as tabelas necessárias.

2. Inicie o servidor:

   ```
   npm start
   ```

   Para desenvolvimento com reinicialização automática:

   ```
   npm run dev
   ```

3. O servidor estará rodando em: <http://localhost:3000>

## Endpoints da API

### Alunos

- **GET /api/alunos** - Listar todos os alunos
- **POST /api/alunos** - Cadastrar novo aluno

  ```json
  {
    "nome": "Nome do Aluno",
    "email": "email@exemplo.com",
    "idade": 25
  }
  ```

### Cursos

- **GET /api/cursos** - Listar todos os cursos
- **POST /api/cursos** - Cadastrar novo curso

  ```json
  {
    "nome": "Nome do Curso",
    "descricao": "Descrição do curso",
    "duracao": 60
  }
  ```

## Estrutura de Migrações

O projeto utiliza Flyway para gerenciar migrações de banco de dados. As migrações estão localizadas em `src/migrations/` e seguem o formato `V1__Nome_da_migracao.sql`.

## Troubleshooting

1. **Erro de conexão com o banco de dados**
   - Verifique se o PostgreSQL está em execução
   - Confira se as credenciais no arquivo `.env` estão corretas

2. **Erro no Flyway**
   - Certifique-se de que o Flyway CLI está instalado e disponível no PATH
   - Verifique se o arquivo `flyway.conf` na raiz do projeto está configurado corretamente

3. **SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string**
   - Verifique se a senha do PostgreSQL está configurada corretamente no arquivo `.env`
   - Certifique-se de que o usuário do PostgreSQL tem permissões suficientes

## Contribuindo

Este é um projeto acadêmico para a Unisagrado. Contribuições são bem-vindas através de pull requests.
