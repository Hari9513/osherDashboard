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

// Get All Stocks
function getOrderHistory() {
    const query = `SELECT * FROM orderhistory`;
    return execQuery(query);
}

function addOrder(order) {
    const query = `INSERT INTO orderhistory SET ?`
    const values = order;
    return execQuery(query, values);
}



module.exports = {
    getOrderHistory,
    addOrder
};