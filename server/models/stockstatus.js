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

// Updating Status
function updateStocks(stocksValue) {
    console.log('Array Value',stocksValue, 'Array Value');
    const query = `UPDATE stocktable SET ? WHERE ID = "${stocksValue.ID}"`;
    const values = stocksValue;
    return execQuery(query, values);
}

module.exports = {
    updateStocks
};