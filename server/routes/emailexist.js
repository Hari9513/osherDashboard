'use strict';

const express = require('express');
var multer = require('multer');
const Email = require('../models').Email;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};

router.route('/emailexist')

    // Check Phone Number Exist
    .post((req, res, next) => {
                const email = {
                    email: req.body.email
                };
                Email.checkemail(email)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })

    // Check Phone Number Exist
    .put((req, res, next) => {
        const email = {
            email: req.body.email
        };
        Email.getUserData(email)
    .then(data => {
        res.json(data);
    })
    .catch(next);
})

router.use(errorHandler)

module.exports = router;
