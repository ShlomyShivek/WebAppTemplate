
exports.express = require('express'); // call express
exports.app=this.express(); // define our app using express

exports.init=function(){

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    var bodyParser = require('body-parser');
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Add headers
    this.app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

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

exports.startStaticFilesServer = function() {
    var appFolder = __dirname + '\\..\\app';

    console.log('starting file server on:' + appFolder);
    this.app.use(this.express.static(appFolder));
}

exports.startRestApi = function(router) {
    // all of our routes will be prefixed with /api
    this.app.use('/api', router);
}