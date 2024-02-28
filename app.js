const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect();

app.use(express.json());

app.post('/register', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('O nome é obrigatório.');
  }
  connection.query('INSERT INTO people (name) VALUES (?)', [name], (error, results) => {
    if (error) {
      return res.status(500).send('Erro ao cadastrar o nome.');
    }
    return res.status(200).send('Nome cadastrado com sucesso.');
  });
});

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (error, results) => {
    if (error) {
      throw error;
    }
    let htmlResponse = '<h1>Full Cycle Rocks!</h1>';
    htmlResponse += '<ul>';
    results.forEach(result => {
      htmlResponse += `<li>${result.name}</li>`;
    });
    htmlResponse += '</ul>';
    res.send(htmlResponse);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});