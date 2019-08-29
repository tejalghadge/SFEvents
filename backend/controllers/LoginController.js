const ControllerUtility = require('./ControllerUtility');
const crypto = require('crypto');
const  hash= (password)=>{
    return crypto.createHmac('sha256', 'csc648-spring2019')
        .update(password)
        .digest('hex');
};
module.exports ={
    addNewUser:(user)=>{
        const connection =  ControllerUtility.createConnection();
        return  new Promise(function(resolve, reject) {
            connection.query('SET FOREIGN_KEY_CHECKS=0')
              const sql = `insert into registered (username,password,email) VALUES ("${user.username}","${hash(user.password)}","${user.email}")`;
              try {
                  connection.query(sql, (err, results) => {
                      connection.query('SET FOREIGN_KEY_CHECKS=1')
                      connection.end();
                      if (err) {
                          reject(err)
                      } else {
                          resolve(results)
                      }

                  })
              }catch (e) {
                  console.log(e)
              }

        })
    },
    getUser:(username)=>{
        const connection =  ControllerUtility.createConnection();
        return   new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM registered WHERE username = ? LIMIT 1', [username], (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results[0])
                }

            })
        })
    }
}