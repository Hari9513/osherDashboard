'use strict';

const express = require('express');
var multer = require('multer');
var nodemailer = require('nodemailer');
const UserStatusUpdate = require('../models').UserStatusUpdate;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};

router.route('/userstatusupdate')

// // Perform Operations By User ID
// router.route('/user/:id')
    .post((req, res, next) => {
        // console.log(req.params);
        console.log(req.body.id);
        var userStatus = {
            id: req.body.id,
            status: 1
        }
        UserStatusUpdate.updateUserStatusById(userStatus)
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })

    .put((req, res, next) => {
        const user = {
            name: req.body.name,
            email: req.body.email
        };
        console.log(user);

        User.updateUserById(req.params.id, user)
        .then(data => {
            res.json(data);
        })
        .catch(next);
    })

router.use(errorHandler)

module.exports = router;
