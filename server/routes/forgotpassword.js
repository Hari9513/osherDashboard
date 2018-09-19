'use strict';
const express = require('express');
var nodemailer = require('nodemailer');
const ForgotPassword = require('../models').ForgotPassword;
const router = express.Router();

var mysql = require('mysql');


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


router.route('/forgotpassword')
	
.put((req, res, next) => {

	var otp = Math.floor(Math.random() * 999999) + 1;	
	var transporter = nodemailer.createTransport({
    	host: 'smtp.gmail.com',
    	port: 587,
    	secure: false,
    	auth: {
        	user: 'harikrishna9513@gmail.com',
        	pass: 'harissmhk5'
    	}
	});

var mailOptions = {
    from: 'harikrishna9513@gmail.com',
    to: req.body.email,
    subject: 'OTP Generated Successfully',
    text: 'OTP Key' + ' ' + otp
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent ');
    }
    transporter.close();
});
	const user = {
		email: req.body.email,
		otp: otp
	};

	ForgotPassword.getOtpKey(user)
		.then(data => {
			console.log(data);
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
	
.post((req, res, next) => {
	const user = {
		email: req.body.email,
	 	otp: req.body.otp
	};

	ForgotPassword.otpCheck(user)
		.then(data => {
			if(data.results.length){
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