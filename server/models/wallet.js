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

// Get All Users
function getWalletDetails() {
    const query = `SELECT * FROM wallethistory`;
    return execQuery(query);
}

// Create New User
function addNewWallet(wallet) {
    const query = `INSERT INTO wallethistory SET ?`
    const values = wallet;
    return execQuery(query, values);
}

module.exports = {
    getWalletDetails,
    addNewWallet
};