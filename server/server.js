// server.js

var httpListener = require('./httpListener');
var apiRoutuer = require('./router');
var applicationActivityService = require('./services/applicationActivityService');

// ROUTES FOR OUR API
// =============================================================================
var router = httpListener.express.Router();
apiRoutuer.initRoutes(router);
httpListener.init();

//starts the REST API
httpListener.startRestApi(router);

//starts the static files server
httpListener.startStaticFilesServer();

//INIT THE DAL
// =============================================================================
var mongoose = require('mongoose');

//initialize the data model
require('./dbModelsInitiator').initialize();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('DB connected');
    applicationActivityService.applicationStarted();
});

mongoose.connect('mongodb://localhost/test');

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8081; 		// set our port
httpListener.app.listen(port);
console.log('Server starts listening on port ' + port);