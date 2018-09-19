'use strict';

const express = require('express');
var multer = require('multer');
const Stock = require('../models').Stock;
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


router.route('/stock')

    // Get All Stocks

    .get((req, res, next) => {
        Stock.getStocks()
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })

    // Add Stocks
    .post((req, res, next) => {
        const stock = {
            stock_name: req.body.stock_name,
            stock_price: req.body.stock_price,
            stock_quantity: req.body.stock_quantity,
            variation: 0.00,
            stock_brokerage: req.body.stock_brokerage,
            video: req.body.fileName,
            filesize: req.body.fileSize,
            filetype: req.body.fileType,
            status: 1
        };
        Stock.addStock(stock)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })


// File Upload 

router.route('/stock/upload')
    .post(uploadImage.single('file'), (req, res, next) => {
        const file = {
            fileName: req.file.filename,
            originalFileName: req.file.originalname
        };
        res.json(file);
    })

// Perform Operations By Stock ID
router.route('/stock/:ID')
    .get((req, res, next) => {
        console.log(req.params.ID);
        Stock.getStockById(req.params.ID)
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })

    // Update Stock Status
    .put((req, res, next) => {
        const stock = {
            stock_name: req.body.stock_name,
            stock_price: req.body.stock_price,
            stock_quantity: req.body.stock_quantity,
            stock_brokerage: req.body.stock_brokerage,
            video: req.body.fileName,
            filesize: req.body.fileSize,
            filetype: req.body.fileType,
            variationPercent: req.body.variationPercent,
            variationAmount: req.body.variationAmount,
            tradedquantity: req.body.tradedquantity,
            status: req.body.status
        };
            Stock.updateStocks(req.params.ID, stock)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })

    // Delete Stock From DB
    
    .delete((req, res, next) => {
        console.log(req.params.ID);
        Stock.deleteStockById(req.params.ID)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })
    

router.use(errorHandler)

module.exports = router;
