      var passport = require('passport');
      var bcrypt = require('bcrypt-nodejs');

      // custom library
      // model
      var Model = require('./model');

      // index
      var index = function(req, res, next) {
         if(!req.isAuthenticated()) {
            res.redirect('/signin'); 
         } else {

            var user = req.user;

            if(user !== undefined) {
               user = user.toJSON();
            }
            res.render('index', {title: 'User Home', user: user});
         }
      };

      // home
      var home = function(req, res, next) {
         if(req.isAuthenticated()) 
            //res.redirect('/');
         res.render('home', {title: 'Home'});
      }; 


      // sign in
      // GET
      var signIn = function(req, res, next) {
         if(req.isAuthenticated()) res.redirect('/');    
         res.render('signin', {title: 'Sign In'});      
      };

      // sign in
      // POST
      var signInPost = function(req, res, next) {
         passport.authenticate('local', { successRedirect: '/',
                                failureRedirect: '/signin'}, function(err, user, info) {
            if(err) {
               return res.render('signin', {title: 'Sign In', errorMessage: err.message});
            } 

            if(!user) {
               return res.render('signin', {title: 'Sign In', errorMessage: info.message});
            }
            return req.logIn(user, function(err) {
               if(err) {
                  return res.render('signin', {title: 'Sign In', errorMessage: err.message});
               } else {
                  return res.redirect('/');
               }
            });
         })(req, res, next);
      };

      // sign up
      // GET
      var signUp = function(req, res, next) {
         if(req.isAuthenticated()) {
            res.redirect('/');
         } else {
            res.render('signup', {title: 'Sign Up'});
         }
      };

      // sign up
      // POST
      var signUpPost = function(req, res, next) {
         var user = req.body;
         var usernamePromise = null;
         usernamePromise = new Model.User({username: user.username}).fetch();

         return usernamePromise.then(function(model) { 
            if(model) {
               res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
            } else {

               var password = user.password;
               var hash = bcrypt.hashSync(password);

               var signUpUser = new Model.User({username: user.username, password: hash});

               signUpUser.save().then(function(model) {
                  // sign-in the newly registered user
                  signInPost(req, res, next);
               });    
            }
         });
      };

      // sign out
      var signOut = function(req, res, next) {
         if(!req.isAuthenticated()) {
            notFound404(req, res, next);
         } else {
            req.logout();
            res.redirect('/signin');
         }
      };


      var data = function(req, res, next){
           if(!req.isAuthenticated()) {
            notFound404(req, res, next);
         } else {
            var leavedata  = req.body;
            console.log (leavedata);
                  var userdataPromise = null;
                  // userdata = new Model.UserData({leavedata: leavedataa.leavedata}).fetch();



                  // return userdata.then(function (model) {
                      var userleavedata = new Model.UserDataPromise({username: 'admin', leavedata: leavedata.leavedata });

                      userleavedata.save().then(function(model){
                        signin(req, res, next);

                      });
                  // });

          }

      };



      // 404 not found
      var notFound404 = function(req, res, next) {
         res.status(404);
         res.render('404', {title: '404 Not Found'});
      };




      // export functions

      // index
      module.exports.index = index;

      // home
      module.exports.home = home;

      // sigin in
      // GET
      module.exports.signIn = signIn;
      // POST
      module.exports.signInPost = signInPost;

      // sign up
      // GET
      module.exports.signUp = signUp;
      // POST
      module.exports.signUpPost = signUpPost;

      // sign out
      module.exports.signOut = signOut;

      // 404 not found
      module.exports.notFound404 = notFound404;