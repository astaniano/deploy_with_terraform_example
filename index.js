var express = require('express');
var pg = require('pg');
var app = express();

console.log(process.env.DB_URL)
const pool = new pg.Pool({
    connectionString: process.env.DB_URL,
});

app.get('/', async function (req, res) {
  const dd = await pool.query(`SELECT * FROM morty`)

  res.json(dd.rows);
});

app.get('/check', (req, res) => {
    res.send('works!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
