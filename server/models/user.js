const pool = require('./db');
var btoa = require('btoa');

function execQuery(query, values) {

	const options = { sql: query };

	if (values) {
		options.values = values;
	}

    return new Promise((resolve, reject) => {
        pool.query(options, (error, results, fields) => {

        	// Handle Error
            if (error) return reject(error);

            resolve({ results, fields });

        });
    });
}

// Get All Users
function getUsers() {
    const query = `SELECT * FROM userTable`;
    return execQuery(query);
}


// Get User By ID
function getUserById(id) {
    const query = `SELECT * FROM userTable WHERE id = "${id}"`;
    return execQuery(query);
}

// Create New User
function createNewUser(user) {
    const query = `INSERT INTO userTable SET ?`
    const values = user;
    values.token = btoa(JSON.stringify(user));
    return execQuery(query, values);
}

function updateUserById(id, user) {
    const query = `UPDATE userTable SET ? WHERE id = "${id}"`;
    const values = user;
    return execQuery(query, values);
}

function deleteUserById(id) {
    const query = `DELETE FROM userTable WHERE id = "${id}"`;
    return execQuery(query);

}


module.exports = {
	getUsers,
	getUserById,
    updateUserById,
	createNewUser,
    deleteUserById
};