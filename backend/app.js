var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var app = express();
var mysql = require('mysql');
const moment = require('moment');
const session = require('express-session');
const LoginController = require('./controllers/LoginController');
const crypto = require('crypto');
 const routes = require('./routes');
const  hash= (password)=>{
  return crypto.createHmac('sha256', 'csc648-spring2019')
      .update(password)
      .digest('hex');
};
var handlebars = require('express3-handlebars')
    .create({ defaultLayout:'main' });

passport.use(new LocalStrategy(
    function(username, password, done) {
      LoginController.getUser(username).then((user)=>{
        if(user.password === hash(password)){
            if(user.blocked){
                return done(null,false,{message:'This account has been blocked'})
            }
            return done(null,user);
        }else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      })
    }
));

app.use(fileUpload());
app.set('port', process.env.PORT || 3000);
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(session({
  secret:'csc648',
  resave: true,
  saveUninitialized: true,
  cookie:{

    maxAge: 300000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    LoginController.getUser(username).then((user)=>{
      done(null,user)
    }).catch((err)=>{
      done(err,null)
    })
});

const IndexRoute = require('./routes/IndexRoute')

app.listen(app.get('port'), function () {

  console.log("Express started on http://localhost:"+app.get('port'));
});



/**
 * service to search events
 */
app.get('/profile',(req,res)=>{
  res.send(req.user);
})

app.get('/loggedin',(req,res)=>{
    console.log('user',req.user)
  if(req.user.isAdmin){
    res.redirect('/admin')
  }else {

      let user =JSON.parse(JSON.stringify(req.user));
      let data = {username: user.username, user_id: user.user_id};
      res.redirect('/management?user_id='+user.user_id+"&username="+user.username);
  }
})
IndexRoute(app);
routes(app)
app.use(function(req,res,next)
{

  var err = new Error('Not Found');
  err.status = 404;
  res.send('page not found')
  // res.sendFile(path.join(__dirname+'/public/404.html'))

})
//hanlde server err 500
app.use(function(err){
  res.status(err.status || 500)
      .send({message: err.message})
});

function escapeChar(column) {
  return column.replace("'", "''");
}
