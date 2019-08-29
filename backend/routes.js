function  ensureAuthenticated (req,res,next){
 	if(req.user){
		next();
	}else {
		res.redirect('/login')
	}
	}
function  ensureAdmin (req,res,next){
	if( req.user.isAdmin){
		next();
	}else {
		res.status(403).end()
	}
}
module.exports = function(app){
 	app.get('/',(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/home/index.html')
 	})
 	app.get('/login',(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/login/index.html')
 	})
 	app.get('/signup',(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/signup/index.html')
 	})
 	app.get('/password/recovery',(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/passwordRecovery/index.html')
 	})
 	app.get('/admin',ensureAuthenticated,ensureAdmin,(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/admin/index.html')
 	})
	app.get('/eventlist',(req,res)=>{

		res.sendFile(__dirname+'/public/pages/eventList/index.html')
	})
 	app.get('/management',ensureAuthenticated,(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/management/index.html')
 	})
 	app.get('/search/results',(req,res)=>{

 		res.sendFile(__dirname+'/public/pages/eventList/index.html')
 	})
 	app.get('/event',(req,res)=>{
 		res.sendFile(__dirname+'/public/pages/event/index.html')
 	})
 	app.get('/privacy',(req,res)=>{
 		res.send("this is the privacy page")
 	})
}