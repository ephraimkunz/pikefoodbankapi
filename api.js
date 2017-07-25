var express = require('express');
var bodyParser = require('body-parser')
var sql = require('mssql');

var app = express();
app.use(bodyParser.json());
var sqlConfig = {
    user: 'ephraimkunz',
    password: 'Howard1!',
    server: 'pikefoodbank.database.windows.net',
    database: 'PikeFoodbankClients',
    options: {
        encrypt: true
    }
}

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening on http://%s:%s', host, port);
});

// Api definitions
app.get('/', function (req, res) {
    res.end('Server is running ...');
});

app.get('/households', function (req, res) {
    sql.connect(sqlConfig, function(err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from Household', function(err, recordset) {
            if(err) console.log(err);
            sql.close();
            res.end(JSON.stringify(recordset.recordset)); // Result in JSON format
        });
    });
});

app.get('/households/:householdId/', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var stringRequest = 'select * from Household where Id = ' + req.params.householdId;
        request.query(stringRequest, function(err, recordset) {
            if(err) console.log(err);
            sql.close();
            res.end(JSON.stringify(recordset.recordset)); // Result in JSON format
        });
    });
});

app.post('/households/', function (req, res) {
    console.log(req.body);
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query("INSERT INTO Household (FirstName, LastName, ZipCode) VALUES ('" + req.body.FirstName + "', '" + req.body.LastName + "', '" + req.body.ZipCode + "')", function (err, results) {
            if (err) console.log(err);
            sql.close();
            res.sendStatus(200);
        });
    });
});