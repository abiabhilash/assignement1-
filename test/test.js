const routes = require('../queries');
const Pool = require('pg').Pool;
const pool = new Pool({
	user: '',
	host: 'localhost',
	database: 'test',
	password: '',
	port: 5432,
});

describe("user Tests", () => {
	test("check users /users", () => {
		var result = routes.getUsers();

		expect(result.length).toBe(() => {
			pool.query("SELECT count(*) as cnt FROM users", function (error, results) {
				if (error) {
					throw error;
				}
				return results.cnt;
			});
		});
	});

	test("check user by id /users", () => {
		let res1 = pool.query("SELECT count(*) as cnt FROM users", function (error, results) {
			if (error) {
				throw error;
			}
			return results.cnt;
		});
		let testNumber = getRandomizer(1, 2 * res);
		let res2 = pool.query(`SELECT * FROM users where id=${testNumber}`, function (error, results) {
			if (error) {
				throw error;
			}
			return results;
		});
		if (testNumber <= res1) {
			expect(res2.length).toBe(1);
		} else {
			expect(res2.length).toBe(0);
		}
		var result = mathOperations.diff(10, 2)
		expect(result).toBe(8);
	});
})

function getRandomizer(bottom, top) {
	return function () {
		return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
	}
}