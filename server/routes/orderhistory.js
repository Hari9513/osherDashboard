'use strict';

const express = require('express');
var multer = require('multer');
const OrderHistory = require('../models').OrderHistory;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};

// function successRespons(res, data) {
//     const isSuccess = true;
//     res.json({ isSuccess, data });
// }


router.route('/orderhistory')

    // Get All Stocks

    .get((req, res, next) => {
        OrderHistory.getOrderHistory()
            .then(data => {
                res.json(data);
            })
            .catch(next);
        })

        .post((req, res, next) => {
            const order = {
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                type:req.body.type,
                status: req.body.status
            };
            OrderHistory.addOrder(order)
                .then(data => {
                    res.json(data);
                })
                .catch(next);
        })
    

router.use(errorHandler)

module.exports = router;
