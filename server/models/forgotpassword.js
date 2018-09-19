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

// Inserting OTP key for forgot password
function getOtpKey(user) {
    const query = `UPDATE userTable SET otpKey = "${user.otp}" WHERE email = "${user.email}"`;
    return execQuery(query);
}


// Check OTP Existing
function otpCheck(user) {
    const query = `SELECT * FROM userTable WHERE email = "${user.email}" && otpKey = "${user.otp}"`;
    return execQuery(query);
}

module.exports = {
    getOtpKey,
    otpCheck
};