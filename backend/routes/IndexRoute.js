const adminRoute = require('./AdminRoute');
const eventRoute = require('./EventRoute');
const homeRoute = require('./HomeRoute');
const managementRoute = require('./ManagementRoute');
const loginRoute =require('./LoginRoute');

module.exports = function (app) {
    adminRoute(app);
    eventRoute(app);
    homeRoute(app);
    managementRoute(app);
    loginRoute(app);
}

