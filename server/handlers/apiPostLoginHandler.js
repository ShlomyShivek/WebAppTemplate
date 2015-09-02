'use strict';
//the url path to be used for this handler
exports.path='/login';

//the http verb to be used for this handler
exports.verb='POST';

var passport=require('passport');

var LocalStrategy = require('passport-local').Strategy;

var authenticationModel=require('dbModelsInitiator').getDbModel('authentication');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("running local strategy for login");
        var authenticationEntity=new authenticationModel();
        if(!authenticationEntity.isDecryptedPasswordValid(password)){
            console.log("invalid password for login");
            return done(null, false, { message: 'invalid username or password' });
        }

        console.log("looking for user details in DB for authentication %s",username);
        authenticationModel.findOne({ username: username }, function(err, user) {
            if (err) {
                console.log("failed to query database %s",err);
                return done(err);
            }
            if (!user) {
                console.log("could not find user in DB %s",username);
                return done(null, false, { message: 'Invalid username or password' });
            }else{
                console.log("username found in DB. checking for password");
                var encryptedPassword=authenticationEntity.encryptPassword(password,user.salt);
                if(user.password!=null && encryptedPassword!=null) {
                    if (encryptedPassword == user.password) {
                        console.log("password=%s, encryptedpassword=%s, user.password=%s", password, encryptedPassword, user.password);
                        console.log("username and password match. User can login %s", username);
                        return done(null, user);
                    }
                }
            }
            return done(null, false, { message: 'Invalid username or password' });
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log("serializing user data %s",user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("deserializing user data");
    done(null, null);
});

exports.handleRequest=[passportLoginHandler,handler];

function passportLoginHandler(req, res, next){
    //get the authentication method that was set to the user
    var authMethod='local';

    //get the passport authentication method
    var passportAuthenticateLogic = passport.authenticate(authMethod, {failureFlash: false});

    //authenticate with passport
    passportAuthenticateLogic(req,res,next);
}

function handler (req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    console.log("next handler");
    res.status(200).json({message: 'logged in'});
};
