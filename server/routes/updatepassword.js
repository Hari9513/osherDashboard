'use strict';
const express = require('express');
var nodemailer = require('nodemailer');
const UpdatePassword = require('../models').UpdatePassword;
const router = express.Router();

var mysql = require('mysql');


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};

router.route('/updatepassword')
	
.put((req, res, next) => {
	const user = {
		email: req.body.email,
	 	password: req.body.newpassword
	};
	UpdatePassword.newPassword(user)
		.then(data => {
			if(data){
			res.json({
				data: data,
				status: 200
			});
		} else {
			res.json({
				data: [],
				status: 404
			})
		}
		})
		.catch(next);
})


router.use(errorHandler)

module.exports = router;