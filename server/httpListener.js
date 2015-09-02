
exports.express = require('express'); // call express
var app=this.express();
exports.app=app;

exports.initBodyParser=function(){
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

}

exports.initHeaders=function(){
    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
        res.setHeader('Access-Control-Allow-Origin', null); //allow origin for running jasmine test locally from file system

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
}

exports.initStaticFilesListener = function() {
    var appFolder = __dirname + '/../app';

    console.log('starting file server on:' + appFolder);
    app.use(this.express.static(appFolder));

    //this.app.use(this.express.session({ secret: 'keyboard cat' }));
}

exports.startRestApi = function(router) {
    // all of our routes will be prefixed with /api
    app.use('/api', router);
}

exports.initCookiesParser=function(){
    var cookieParser = require('cookie-parser')
    app.use(cookieParser())
}

exports.initSessions=function(){
    var session = require('express-session');
    var uuid = require('node-uuid');
    app.use(session({
        genid: function(req) {
            return uuid.v1(); // use UUIDs for session IDs
        },
        secret: 'keyboard cat'
    }))
}

exports.initPassport=function(){
    var passport=require('passport');
    app.use(passport.initialize());
    app.use(passport.session());
}