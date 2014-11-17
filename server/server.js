// server.js

var httpListener = require('./httpListener');
var apiRoutuer = require('./router');
var requestHandlerData = require('./requestHandlerData');

var handlers=new Array();
handlers[apiRoutuer.GET]=new Array();
handlers[apiRoutuer.GET].push(new requestHandlerData('/',require('./serviceLogic/apiGetTest')));
handlers[apiRoutuer.GET].push(new requestHandlerData('/readme',require('./serviceLogic/apiGetReadme')));

// ROUTES FOR OUR API
// =============================================================================
var router = httpListener.express.Router(); 				// get an instance of the express Router
apiRoutuer.initRoutes(router, handlers);
httpListener.init();

//starts the REST API
httpListener.startRestApi(router);

//starts the static files server
httpListener.startStaticFilesServer();


// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8081; 		// set our port
httpListener.app.listen(port);
console.log('Magic happens on port ' + port);