            var express = require('express');
            var bodyParser = require('body-parser');
            var cookieParser = require('cookie-parser');
            var session = require('express-session');
            var bcrypt = require('bcrypt-nodejs');
            var ejs = require('ejs');
            var path = require('path');
            var passport = require('passport');
            var LocalStrategy = require('passport-local').Strategy;


            // custom libraries
            // routes
            var route = require('./route');
            // model
            var Model = require('./model');

            var app = express();

            passport.use(new LocalStrategy(function(username, password, done) {
               new Model.User({username: username}).fetch().then(function(data) {
                  var user = data;
                  if(user === null) {
                     return done(null, false, {message: 'Invalid username or password'});
                  } else {
                     user = data.toJSON();
                     if(!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, {message: 'Invalid username or password'});
                     } else {
                        return done(null, user);
                     }
                  }
               });
            }));

            passport.serializeUser(function(user, done) {
              done(null, user.username);
            });

            passport.deserializeUser(function(username, done) {
               new Model.User({username: username}).fetch().then(function(user) {
                  done(null, user);
               });
            });

            app.set('port', process.env.PORT || 3000);
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'ejs');

            app.use(cookieParser());
            //app.use(bodyParser());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            //app.use(session({secret: 'secret strategic xxzzz code'}));
            app.use(session({ secret: 'secret strategic xxzzz code', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
            app.use(passport.initialize());
            app.use(passport.session());

            //GET
            app.get('/home', route.home)

            // GET
            app.get('/', route.home);

            app.get('/index', route.index);

            app.post('/index', route.indexPost) ;

            // signin
            // GET
            app.get('/signin', route.signIn);
            // POST
            app.post('/signin', route.signInPost);

            // signup
            // GET
            app.get('/signup', route.signUp);
            // POST
            app.post('/signup', route.signUpPost);

            // logout
            // GET
            app.get('/signout', route.signOut);



            //app.get('/Data', route.data);





            // 404 not found
            app.use(route.notFound404);

            var server = app.listen(app.get('port'), function(err) {
               if(err) throw err;

               var message = 'Server is running @ http://localhost:' + server.address().port;
               console.log(message);
            });