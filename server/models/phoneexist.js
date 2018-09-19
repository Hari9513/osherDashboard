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

// Check Phone Number Exist
function checkphone(user) {
    console.log(user);
    const query = `SELECT phone FROM dashboardusersTable WHERE phone = "${user.phone}"`;
    return execQuery(query);
}

module.exports = {
	checkphone
};