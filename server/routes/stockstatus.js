'use strict';
const express = require('express');
var nodemailer = require('nodemailer');
const UpdateStockStatus = require('../models').UpdateStockStatus;
const router = express.Router();

var mysql = require('mysql');


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};

router.route('/stockstatus')
	
.put((req, res, next) => {
        const stockArray = req.body;

        for(let i=0; i<stockArray.length; i++){
            UpdateStockStatus.updateStocks(stockArray[i])
            .then(data => {
                res.json(data);
            })
            .catch(next);
        }
})


router.use(errorHandler)

module.exports = router;