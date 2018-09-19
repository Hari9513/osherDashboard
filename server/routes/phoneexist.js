'use strict';

const express = require('express');
var multer = require('multer');
const Phone = require('../models').Phone;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};

router.route('/phoneexist')

    // Check Phone Number Exist
    .post((req, res, next) => {
                const phone = {
                    phone: req.body.phone
                };
                Phone.checkphone(phone)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })

router.use(errorHandler)

module.exports = router;
