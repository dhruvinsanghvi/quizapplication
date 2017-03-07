var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(session({ secret: 'securedsession' }));

// Express Session
// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
// }));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash



app.use(express.static(__dirname + '/public'))
List = require('./models/listmodel');
Quiz = require('./models/quizmodel');
User = require('./models/usermodel');
mongoose.connect('mongodb://localhost/quizapplication');
var db = mongoose.connection;
app.get('/', function  (req, res) {

	res.send("hello world ehhevhe wjdhjwdhwhdjwhd");
});
app.get('/api/list', function(req, res){

	List.getList(function(err, list){
		if(err){
			throw err;

		}
		
		res.json(list);

	});
});

app.get('/api/quiz', function(req, res){

	Quiz.getQuiz(function(err, quiz){
		if(err){
			res.json(err);

		}
	
		res.json(quiz);

	});



});

app.get('/api/quiz/:_id', function(req, res){

	Quiz.getQuizById(req.params._id, function(err, quiz){
		if(err){
			throw err;

		}
	
		res.json(quiz);

	});



});
var auth = function(req, res, next){
	console.log(req.isAuthenticated());
console.log("------------------");

 if (!req.isAuthenticated()) res.send(401); else next(); 


}; 
app.get('/api/users', auth, function(req, res){

console.log(req.body);
	User.getUsers(function(err, user){
		if(err){
			throw err;

		}
	
		res.json(user);

	});

});
app.get('/api/users/:_id', function(req, res){

  User.getUserById(req.params._id, function(err, user){
    if(err){
      throw err;

    }
  
    res.json(user);

  });



});

app.post('/api/users', function(req, res){
	var user = req.body;
	console.log(user);

	User.addUser(user, function(err, user){
		if(err){
			throw err;

		}
	
		 res.json(user);

	});



});
app.put('/api/users/:_id', function(req, res){
  var id = req.params._id;
  var user = req.body;
  console.log(user);

  User.updateUser(id, user, {}, function(err, user){
    if(err){
      throw err;

    }
  
     res.json(user);

  });


});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/api/login', passport.authenticate('local-login'),function(req, res) {
      res.json(req.user);
    });
passport.use('local-login', new LocalStrategy(
      function(username, password, done) {
        
   User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }
   

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
      }
    );
 }
    ));



app.listen(3000);
console.log("port running succesfully");