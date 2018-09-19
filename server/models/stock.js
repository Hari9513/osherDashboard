const pool = require('./db');
var btoa = require('btoa');
var mysql = require('mysql');
var q = require('Q');
var defered = q.defer();

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
function getStocks() {
    const query = `SELECT * FROM stocktable`;
    return execQuery(query);
}


// Get User By ID
function getStockById(id) {
    console.log(id);
    const query = `SELECT * FROM stocktable WHERE ID = "${id}"`;
    return execQuery(query);
}


// Add Stocks 
function addStock(user) {
    const query = `INSERT INTO stocktable SET ?`
    const values = user;
    return execQuery(query, values);
}

function updateStocks(id, stockValue) {
    const query = `UPDATE stocktable SET ? WHERE ID = "${id}"`;
    const values = stockValue;
    return execQuery(query, values);
}

function updateUserById(id, user) {
    const query = `UPDATE stocktable SET ? WHERE id = "${id}"`;
    const values = user;
    return execQuery(query, values);
}

function deleteStockById(id) {
    console.log(id);
    const query = `DELETE FROM stocktable WHERE ID = "${id}"`;
    return execQuery(query);

}


module.exports = {
	getStocks,
	getStockById,
    updateUserById,
	addStock,
    deleteStockById,
    updateStocks
};