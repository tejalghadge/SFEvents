const ControllerUtility = require('./ControllerUtility');

module.exports ={
    getReportedEvents:()=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('select t.eid, t.comment, t.username, t1.title, t2.host_id, t3.username,t4.username as host from event_report t, events t1, event_host t2,registered t4, registered t3 where t.eid = t1.eid and t2.host_id = t4.user_id and t.eid = t2.event_id and t3.user_id = t2.host_id',[true,false],(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }

            })
        })
    },
    getReportedUsers:()=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('SELECT * FROM registered WHERE isReported = ? AND isBlocked = ?',[true,false],(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }

            })
        })
    },


    getBlockedEvents:()=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('SELECT * FROM events WHERE isBlocked = ?',[true],(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }

            })
        })
    },
    getBlockedUsers:()=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('SELECT * FROM registered WHERE isBlocked = ?',[true],(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }

            })
        })
    },
    reportEvent:(eventID,req)=>{
        return new Promise(function(resolve, reject) {
            console.log(req.body)
            const connection =  ControllerUtility.createConnection();
            connection.query('UPDATE events SET isReported = ? WHERE eid = ?', [true, eventID],(err)=>{
                connection.query("INSERT  INTO event_report (eid,username,comment) VALUES (?,?,?)",[parseInt(eventID),req.user.username,req.body.reason],(err)=>{
                    connection.end()
                    if(err){
                        reject(err)
                    }else {
                        resolve()
                    }

                })
            })
        })
    },
    reportUser:(userID)=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('UPDATE registered SET isReported = ? WHERE user_id = ?', [true, userID],(err)=>{
                connection.end()
                if(err){
                    reject(err)
                }else {
                    resolve()
                }
            })
        })
    },
    blockEvent:(eventID)=>{
        return new Promise(function(resolve, reject) {
       const connection =  ControllerUtility.createConnection();
        connection.query('UPDATE events SET isBlocked = ? WHERE eid = ?', [true, eventID],(err)=>{
            connection.end()
            if(err){
                reject(err)
            }else {
                resolve()
            }

        })
        })
    },
    unblockEvent:(eventID)=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('UPDATE events SET isBlocked = ? WHERE eid = ?', [false, eventID],(err)=>{

                connection.end()
                if(err){
                    reject(err)
                }else {
                    resolve()
                }
            })
        })
    },
    blockUser:(userID)=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('UPDATE registered SET isBlocked = ? WHERE user_id = ?', [true, userID],(err)=>{
                connection.end()
                if(err){
                    console.log(err)
                    reject(err)
                }else {
                    resolve()
                }
            })
        })
    },
    unblockUser:(userID)=>{
        return new Promise(function(resolve, reject) {
            const connection =  ControllerUtility.createConnection();
            connection.query('UPDATE registered SET isBlocked = ? WHERE user_id = ?', [false, userID],(err)=>{
                connection.end()
                if(err){
                    reject(err)
                }else {
                    resolve()
                }
            })
        })
    }
}