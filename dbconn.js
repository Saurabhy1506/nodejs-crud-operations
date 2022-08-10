const mysql = require('mysql'); 

var mysqlConnection = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'test' 
});

module.exports = mysqlConnection; //exporting mysql connection object to use on other pages