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

// Check User are loggedIN
function findUser(user) {

    const query = `SELECT * FROM dashboardusersTable WHERE email = "${user.email}" && password = "${user.password}"`;

    return execQuery(query);
}

module.exports = {
    findUser
};