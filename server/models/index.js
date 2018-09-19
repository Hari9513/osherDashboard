'use strict';
// const db = require('./db');
// const userSchema = require('./userSchema');

// module.exports = { db, userSchema };

const User = require('./user');
const DashboardUsers = require('./dashboardusers');
const Login = require('./login');
const ForgotPassword = require('./forgotpassword');
const UpdatePassword = require('./updatepassword');
const Stock = require('./stock');
const Phone = require('./phoneexist');
const Email = require('./emailexist');
const UpdateStockStatus = require('./stockstatus');
const OrderHistory = require('./orderhistory');
const Orders = require('./orders');
const Coupons = require('./couponmodel');
const Wallet = require('./wallet');
const UserStatusUpdate = require('./userstatusupdate');

module.exports = {
	User,
	Login,
	ForgotPassword,
	UpdatePassword,
	Stock,
	Phone,
	Email,
	UpdateStockStatus,
	OrderHistory,
	Orders,
	Coupons,
	Wallet,
	UserStatusUpdate,
	DashboardUsers
};