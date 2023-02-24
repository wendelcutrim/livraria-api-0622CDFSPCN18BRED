# livraria-api-0622CDFSPCN18BRED

## Objetivo

Nesta atividade, vamos treinar e relembrar sobre:

-   [ ] Criação de rotas
-   [ ] Retorno de recursos
-   [ ] Modificações na base de dados

### Novidades:

Iremos utilizar migrations e seeders para esta atividade, variáveis de ambiente,além de criar um servidor usando o express-generator.

## Atividade 1

Olá, este projeto já tem uma base de dados em JS pronta e iremos criar uma API e alimentar o nosso banco de dados real com os dados que está nesse arquivo de script.

_Obs: O banco de dados em JS está na pasta: **/database/old/db.js**_

O modelo de como deve ser a tabela no banco está no seguinte caminho: **/database/db.drawio**

_Será necessário instalar a extensão **drawio** para conseguir visualizar o arquivo_

**_Obs: Para esta atividade, iremos criar somente a tabela e model books_**

### Rotas

Após a conversa com o tech lead, ficou estabelecido que:

O nome do banco de dados será `dh_bookstore`

O endpoint de livros será:

```http
/api/v1/livros
```

Ou seja, teremos que criar um CRUD utilizando como base neste endpoint.

#### Sendo assim, as rotas serão:

Nome do arquivo de rotas: `booksV1`
Nome do arquivo do controller: `BooksController`

**Retorna todos os livros:**

```http
  GET /api/v1/livros
```

_Esse parâmetro sór será necessário implementar, quando criarmos os endpoints de autenticação que será na próxima aula._
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#

**Retorna um livro específico**

```http
  GET /api/v1/livros/{id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

#

**Criar um livro**

```http
  POST /api/v1/livros
```

| Parâmetro      | Tipo     | Descrição                                             |
| :------------- | :------- | :---------------------------------------------------- |
| `title`        | `string` | **Obrigatório**. Título do livro                      |
| `total_pages`  | `number` | **Obrigatório**. Quantidade total de páginas do livro |
| `release_year` | `string` | **Obrigatório**. Ano de lançamento do livro           |
| `stock`        | `number` | **Obrigatório**. Estoque atual do livro               |

**Editar um livro**

```http
  PUT /api/v1/livros/{id}
```

| Parâmetro      | Tipo     | Descrição                                             |
| :------------- | :------- | :---------------------------------------------------- |
| `id`           | `number` | **Obrigatório**. O ID do item que você quer editar    |
| `title`        | `string` | **Obrigatório**. Título do livro                      |
| `total_pages`  | `number` | **Obrigatório**. Quantidade total de páginas do livro |
| `release_year` | `string` | **Obrigatório**. Ano de lançamento do livro           |
| `stock`        | `number` | **Obrigatório**. Estoque atual do livro               |

#

**Deletar um livro**

```http
  DELETE /api/v1/livros/{id}
```

| Parâmetro | Tipo     | Descrição                                       |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `number` | **Obrigatório**. O ID do item que será deletado |

#

### Observações:

Esteja preparado para retornar uma mensagem de erro caso não seja possível completar a funcionalidade em cada endpoint da API.

Deve ser criada uma documentação dos endpoints no **postman**

## Dicas

Para conseguir resolver este desafio será necessário:

-   [x] Criar um servidor no formato de API (pode utilizar o express-generator): https://expressjs.com/en/starter/generator.html
-   [x] Instalar o **nodemon** como dependência de desenvolvimento.
-   [x] Instalar o Sequelize, Sequelize CLI e o driver do MySQL.
-   [x] Instalar a lib do **dotenv** para trabalhar com variáveis de ambiente.
-   [x] Criar o arquivo .sequelizerc e realizar a configuração.
-   [x] Criar o arquivo .env e criar as variáveis de ambiente.
-   [x] Criar o banco de dados utilizando o CLI do sequelize
-   [x] Criar a migration para gerar a tabela de livros
-   [x] Criar a seeder para popular o banco de dados com os arquivos que temos no "banco de dados JS".
-   [x] Criar as rotas do endpoint de livros.
-   [x] Criar os controllers para realizar o CRUD.
