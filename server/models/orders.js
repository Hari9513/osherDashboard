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
function getOrderByName(order) {
    const query = `SELECT * FROM orderhistory WHERE name = "${order.name}" `;
    return execQuery(query);
}


// Get User By ID
function getStockById(id) {
    console.log(id);
    const query = `SELECT * FROM stocktable WHERE ID = "${id}"`;
    return execQuery(query);
}


module.exports = {
	getOrderByName,
	getStockById
};