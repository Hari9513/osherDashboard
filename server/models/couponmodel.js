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


// Get Coupon Details
function getCouponDetails(user) {
    console.log(user);
    const query = `SELECT * FROM coupentable`;
    return execQuery(query);
}


// Create New Coupen
function createNewCoupen(coupen) {
    const query = `INSERT INTO coupentable SET ?`
    const values = coupen;
    return execQuery(query, values);
}

// Check Coupon Exist
function findCoponCode(user) {
console.log(user);
const query1 = `UPDATE coupentable SET status = "${user.status}" WHERE email = "${user.email}"`;
    const query = `SELECT * FROM coupentable WHERE email = "${user.email}" && couponcode = "${user.couponcode}"`;
     execQuery(query1)
    return execQuery(query);
}

module.exports = {
    findCoponCode,
    createNewCoupen,
    getCouponDetails
};