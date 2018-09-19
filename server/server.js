'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8000;
var nodemailer = require('nodemailer');

const routes = require('./routes')
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// require('./routes')(app);

app.use("/api",require('./routes/user'))
app.use("/api",require('./routes/dashboardusers'))
app.use("/api",require('./routes/login'))
app.use("/api",require('./routes/forgotpassword'))
app.use("/api",require('./routes/updatepassword'))
app.use("/api",require('./routes/stock'))
app.use("/api",require('./routes/phoneexist'))
app.use("/api",require('./routes/emailexist'))
app.use("/api",require('./routes/stockstatus'))
app.use("/api",require('./routes/orderhistory'))
app.use("/api",require('./routes/orders'))
app.use("/api",require('./routes/couponmodel'))
app.use("/api",require('./routes/wallet'))
app.use("/api",require('./routes/userstatusupdate'))
app.listen(port, () => {
	console.log(`Server is listening at port ${port}`);
});