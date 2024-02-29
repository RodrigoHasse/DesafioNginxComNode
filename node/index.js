const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

app.get('/', (req,res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('Rodrigo')`
    connection.query(sql)
    connection.query('SELECT id, name FROM people', (error, results) => {
    if (error) {
      throw error;
    }
    let htmlResponse = '<h1>Full Cycle Rocks!</h1>';
    htmlResponse += '<ul>';
    results.forEach(result => {
      htmlResponse += `<li>${result.name}-${result.id} </li>`;
    });
    htmlResponse += '</ul>';
    res.send(htmlResponse);
  })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})