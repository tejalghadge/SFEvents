var  HomeController= {};
const ControllerUtility = require('./ControllerUtility');





/**
 * This function search values based on the filter string
 * @param req
 * @param res
 * @param next
 */
HomeController.search= function(req, res, next){
    let filterValue = req.query.filter;
    console.log("****EVENT" + filterValue);
    const con = ControllerUtility.createConnection();
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM events WHERE title LIKE '%" + filterValue + "%' OR description LIKE '%" + filterValue +"%'"
            + " OR location LIKE '%" + filterValue +"%'";

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.searchResult = result;
            res.filterValue = filterValue;
            con.end();
            res.send(result);
            //res.redirect('/event');

        });
    });

}

/**
 * This function search values based on the filter string
 * @param req
 * @param res
 * @param next
 */
HomeController.searchFilter= function(req, res, next){

    let start_time = req.query.start_time == undefined? '' :   req.query.start_time;
    let end_time = req.query.end_time == undefined? '': req.query.end_time;
    let price =req.query.price== undefined? 0 :  req.query.price;
    const con = ControllerUtility.createConnection();
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM events WHERE start_time > '"+start_time +"' and end_time < '"+end_time +"' OR price ="+price +"";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.searchResult = result;
            con.end();
            res.send(result);
        });
    });

}



HomeController.loadSearch= function(req, res, next){
    let filterValue = req.query.filter;
    res.redirect('/eventList?filter='+ req.query.filter);

}

module.exports = HomeController;