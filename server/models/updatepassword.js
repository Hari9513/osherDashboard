const pool = require('./db');

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

// Updating New Password
function newPassword(user) {
    const query = `UPDATE userTable SET password = "${user.password}" WHERE email = "${user.email}"`;
    return execQuery(query);
}

module.exports = {
    newPassword
};