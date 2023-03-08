"use strict";
exports.__esModule = true;
var Pool = require('pg').Pool;
var pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'test',
    password: '',
    port: 5432
});
var getUsers = function (request, response) {
    pool.query("SELECT * FROM users ORDER BY id ASC", function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
var getUserById = function (request, response) {
    var id = parseInt(request.params.id);
    pool.query("SELECT * FROM users WHERE id = ".concat(id), function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
var createUser = function (request, response) {
    var _a = request.body, name = _a.name, email = _a.email;
    // console.log(`INSERT INTO users (name, email) VALUES ('${name}', '${email}')`);
    // console.log('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    // [name, email]);
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(201).send("User added with ID: ".concat(results.rows[0].id));
    });
};
var updateUser = function (request, response) {
    var id = parseInt(request.params.id);
    var _a = request.body, name = _a.name, email = _a.email;
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("User modified with ID: ".concat(id));
    });
};
var deleteUser = function (request, response) {
    var id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("User deleted with ID: ".concat(id));
    });
};
module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};
