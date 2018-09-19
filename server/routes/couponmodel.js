'use strict';
const express = require('express');
const Coupon = require('../models').Coupons;
const router = express.Router();

var mysql = require('mysql');


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


router.route('/coupon')

.get((req, res, next) => {
	Coupon.getCouponDetails()
		.then(data => {
			console.log(data);
			res.json(data);
		})
		.catch(next);
})
	
.post((req, res, next) => {
	var couponcode = 'OS' + Math.floor(Math.random() * 99999) + 1;
	const coupon = {
		email: req.body.email,
		couponcode: couponcode,
		couponamount: req.body.couponamount,
		status: 1
	};
console.log(coupon);
	Coupon.createNewCoupen(coupon)
		.then(data => {
			res.json(data);
		})
		.catch(next);
})

.put((req, res, next) => {
	const coupon = {
		email: req.body.email,
		couponcode: req.body.couponcode,
		status: 0
	};
console.log(coupon);
	Coupon.findCoponCode(coupon)
		.then(data => {
			res.json(data);
		})
		.catch(next);
})

router.use(errorHandler)

module.exports = router;