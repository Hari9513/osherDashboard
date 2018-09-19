'use strict';

const express = require('express');
var multer = require('multer');
var nodemailer = require('nodemailer');
const Wallet = require('../models').Wallet;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


router.route('/wallet')

    // Get All Users

    .get((req, res, next) => {
        Wallet.getWalletDetails()
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })

//     // Create New Users

    .post((req, res, next) => {
                const wallet = {
                    couponcode: req.body.couponcode,
                    creditedMoney: req.body.creditedMoney
                };
            Wallet.addNewWallet(wallet)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })




router.use(errorHandler)

module.exports = router;
