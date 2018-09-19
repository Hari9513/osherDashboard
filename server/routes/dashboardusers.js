'use strict';

const express = require('express');
var multer = require('multer');
var nodemailer = require('nodemailer');
const User = require('../models').User;
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../src/assets/imgs')
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


router.route('/user')

    // Get All Users

    .get((req, res, next) => {
        User.getUsers()
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })

//     // Create New Users

    .post((req, res, next) => {
        var otp = Math.floor(Math.random() * 999999) + 1;
                const user = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    roles: req.body.roles
                };
            User.createNewUser(user)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })


// // Perform Operations By User ID
router.route('/user/:id')
    .get((req, res, next) => {
        User.getUserById(req.params.id)
            .then(data => {
                res.json(data);
            })
            .catch(next);

    })

    .put((req, res, next) => {
        const user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            roles: req.body.roles
        };
        console.log('Userrrrrrrrrrrrrrrrrrrrrrrrrrrr',user);

        User.updateUserById(req.params.id, user)
        .then(data => {
            res.json(data);
        })
        .catch(next);
    })

// File Upload 

router.route('/user/uploadImage')
    .post(uploadImage.single('file'), (req, res, next) => {
        const file = {
            fileName: req.file.filename,
            originalFileName: req.file.originalname
        };
    })

//     // Delete User From DB

     .delete((req, res, next) => {
        User.deleteUserById(req.params.id)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    })





router.use(errorHandler)

module.exports = router;
