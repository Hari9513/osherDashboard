'use strict';
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/sample_crudDB')
// .then(data => {
// 	console.log('mongodb connected');
// })
// .catch(error => {

// 	console.log(error.message);
// })

// module.exports = mongoose;

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'osher'
});

pool.on('enqueue', () => console.log('Waiting for available connection slot'));

pool.on('error', error => console.error(error));


module.exports = pool;