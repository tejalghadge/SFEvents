const HomeController = require('../controllers/HomeController.js');

module.exports = function(app) {

    app.get('/api/search', function(req, res) {

         HomeController.search(req, res);
    });

    app.get('/api/loadSearch', function(req, res) {

        HomeController.loadSearch(req, res);
    });

    app.get('/api/searchFilter', function(req, res) {

        HomeController.searchFilter(req, res);
    });




}