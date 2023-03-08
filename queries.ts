const Pool = require('pg').Pool;
import {Request,Response} from "express";
const pool = new Pool({
	user: '',
	host: 'localhost',
	database: 'test',
	password: '',
	port: 5432,
});

const getUsers = (request:Request, response:Response) => {
	pool.query(`SELECT * FROM users ORDER BY id ASC`, (error:any, results:any) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getUserById = (request:Request, response:Response) => {
	const id  = parseInt(request.params.id);

	pool.query(`SELECT * FROM users WHERE id = ${id}`, (error:any, results:any) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const createUser = (request:Request, response:Response) => {
	const { name, email } = request.body;
	// console.log(`INSERT INTO users (name, email) VALUES ('${name}', '${email}')`);
	// console.log('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    // [name, email]);
	
	pool.query(
		'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email],
		(error:any, results:any) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`User added with ID: ${results.rows[0].id}`);
		}
	);
};


const updateUser = (request:Request, response:Response) => {
	const id = parseInt(request.params.id);
	const { name, email } = request.body;

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
		(error:any, results:any) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

const deleteUser = (request:Request, response:Response) => {
	const id : number  = parseInt(request.params.id);

	pool.query('DELETE FROM users WHERE id = $1', [id],(error:any, results:any) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};


module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};