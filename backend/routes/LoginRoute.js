
const LoginController = require('../controllers/LoginController.js');
const passport = require('passport');

module.exports = function(app) {
	app.post('/api/login',
		passport.authenticate('local', { successRedirect: '/loggedin',
			failureRedirect: '/login'})
		);
	app.post('/api/signup',(req,res)=>{
		LoginController.addNewUser(req.body).then(()=>{
			res.send({done:true})
		}).catch((err)=>{
			res.status(500).end()
		})
	})
	app.get('/api/logout',(req,res)=>{
		req.logout();
		res.redirect('/login');
	})
}