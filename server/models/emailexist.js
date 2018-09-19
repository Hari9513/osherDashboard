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
function checkemail(user) {
    console.log(user);
    const query = `SELECT email FROM dashboardusersTable WHERE email = "${user.email}"`;
    return execQuery(query);
}

// Get User data by Email ID
function getUserData(user) {
    console.log(user);
    const query = `SELECT * FROM dashboardusersTable WHERE email = "${user.email}"`;
    return execQuery(query);
}

module.exports = {
    checkemail,
    getUserData
};