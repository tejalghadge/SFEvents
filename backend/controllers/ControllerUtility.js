const mysql = require('mysql');
const ControllerUtility= {};
const nodemailer = require("nodemailer");

    /*
     This function creates a connection to team2 database with admin user
     */
    ControllerUtility.createConnection = function() {
        return mysql.createConnection({
            host: "18.222.238.235",
            user: "admin",
            password: "csc648_848_02",
            database: "team2",
            port:3306
        });
    }

    /**
     * This function creates connection pol
     * @type {Pool}
     */
    ControllerUtility.connectionPool = mysql.createPool({
        connectionLimit: 100,
        host: "18.222.238.235",
        user: "admin",
        password: "csc648_848_02",
        database: "team2",
        port:3306
    });
    /**
     * This function escapes the ' character from search string
     * @param column
     * @returns {*}
     */
    ControllerUtility.escapeChar = function(column) {
        if(column)
            return column.replace("'", "''");
    }


    /**
     * This method send invitations of event
     * @param HelperOptions mail configuration i.e. from, to, subject and html template
     */
    ControllerUtility.sendInvitations = function(HelperOptions,cb){
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: 'sfevents848@gmail.com',
                    pass: 'sfevents@12345'
                }
            });

            transporter.sendMail(HelperOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }else {
                    if(cb){
                        cb()
                    }
                }
            });

    }

module.exports = ControllerUtility;