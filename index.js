const express = require('express');
const mysqlConnection = require('./dbconn');
var app = express(); 
const bodyparser = require('body-parser'); 

app.use(bodyparser.json()); 

app.listen(3000, () => console.log('Server is runnig at port no : 3000'));

//root path
app.get('/', (req, res) => {
    res.send("Hello Users"); 
});

//GET API all Movies list
app.get('/movies', (req, res) => {
    mysqlConnection.query('SELECT * FROM movies', (err, rows, fields) => {
        if (!err) 
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an specific movie based on id
app.get('/movies/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an specific movie based on id
app.delete('/movies/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM movies WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an new movie record with POST HTTP Method
app.post('/movies', (req, res) => {
    let movies = req.body;
    var sql = `INSERT INTO movies (name, img, summary) VALUES ('${movies.name}', '${movies.img}', '${movies.summary}');`;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            if(rows.affectedRows > 0)
                res.send('Inserted Movies id : '+rows.insertId);
        else
            console.log(err);
    })
});

//Update an movie record with PUT HTTP Method
app.put('/movies/:id', (req, res) => {
    let movies = req.body;
    var sql = `UPDATE movies SET name = '${movies.name}', img= '${movies.img}', summary= '${movies.summary}' WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
