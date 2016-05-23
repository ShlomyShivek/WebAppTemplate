'use strict';
//the url path to be used for this handler
exports.path='/login';

//the http verb to be used for this handler
exports.verb='POST';


exports.handleRequest=[passportLoginHandler,handler];

function passportLoginHandler(req, res, next){
    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    console.log(req.body);
    //get the authentication method that was set to the user
    var authMethod='local';

    var passport=require('passport');
    //get the passport authentication method
    var passportAuthenticateLogic = passport.authenticate(authMethod, {failureFlash: true});

    //authenticate with passport
    passportAuthenticateLogic(req,res,next);
}

function handler (req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    console.log("next handler");
    res.status(200).json({message: 'logged in'});
}
