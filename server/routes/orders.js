'use strict';

const express = require('express');
var multer = require('multer');
const SeparateOrder = require('../models').Orders;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var uploadImage = multer({ storage: storage })

// function successRespons(res, data) {
//     const isSuccess = true;
//     res.json({ isSuccess, data });
// }


router.route('/separateorder')

    // Get All Stocks

    .post((req, res, next) => {
        console.log(req.body);
        const order = {
            name: req.body.stock_name
        }
        console.log(order);
        SeparateOrder.getOrderByName(order)
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })
    

router.use(errorHandler)

module.exports = router;
