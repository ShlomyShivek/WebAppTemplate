// server.js

//this package allow to use direct path for require script files (instead of relative paths)
require('app-module-path').addPath(__dirname);

var httpListener = require('httpListener');

var applicationActivityService = require('services/applicationActivityService');


//INIT THE DAL
// =============================================================================
var mongoose = require('mongoose');

//initialize the data model
require('dbModelsInitiator').initialize();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('DB connected');
    applicationActivityService.applicationStarted();
});

mongoose.connect('mongodb://localhost/test');


// EXPRESS AND ROUTES INITIALIZATION
// =============================================================================
var expressRouter = httpListener.express.Router();
var apiRoutuer = require('router');
apiRoutuer.initRoutes(expressRouter);

//init static files listener
httpListener.initStaticFilesListener();

//init cookies parser
httpListener.initCookiesParser();

//init body parser
httpListener.initBodyParser();

//init sessions
httpListener.initSessions();

//init passport to express
httpListener.initPassport();

//init headers
httpListener.initHeaders();

//starts the REST API
httpListener.startRestApi(expressRouter);








// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8081; 		// set our port
httpListener.app.listen(port);
console.log('Server starts listening on port ' + port);