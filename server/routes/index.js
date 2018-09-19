'use strict';
// const user = require('./user');

// module.exports = { user };
const path = require('path');
const UserRoutes = require('./user');
// const UserRoutes = require('./user');

// API Declarations
module.exports = app => {
    app.use('/api', UserRoutes);
};