var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var db = require('./queries');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app["delete"]('/users/:id', db.deleteUser);
app.listen(port, function () {
    console.log("App running on port ".concat(port, "."));
});
