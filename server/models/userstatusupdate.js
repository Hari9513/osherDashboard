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

// Get User Status By ID
function updateUserStatusById(user) {
    const query = `UPDATE userTable SET ? WHERE id = "${user.id}"`;
    const values = user;
    return execQuery(query, values);
}

function updateUserById(id, user) {
    const query = `UPDATE userTable SET ? WHERE id = "${id}"`;
    const values = user;
    return execQuery(query, values);
}

module.exports = {
	updateUserStatusById,
    updateUserById
};