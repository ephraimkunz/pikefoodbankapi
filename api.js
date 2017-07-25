var express = require('express');
var sql = require('mssql');

var app = express();
var sqlConfig = {
    user: '',
    password: '',
    server: '',
    database: ''
}

var server = app.lister(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening on http://%s:%s', host, port);
});

// Api definitions
