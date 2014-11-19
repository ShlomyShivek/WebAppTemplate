exports.GET=0;

exports.initRoutes=function(router) {
    var fs = require('fs');
    var handlersBasePath = './handlers/';
    var handlersFiles = fs.readdirSync(handlersBasePath);

    var l = handlersFiles.length;
    for (var i = 0; i < l; i++) {
        var handler = require(handlersBasePath + handlersFiles[i]);

        if (handler.verb == 'GET') {
            console.log("Adding GET router for: " + handlersFiles[i] +' for URL:' + handler.path);
            router.get(handler.path, handler.handleRequest);
        }else if (handler.verb=='POST'){
            console.log("Adding POST router for: " + handlersFiles[i] +' for URL:' + handler.path);
            router.post(handler.path,handler.handleRequest);
        }else if (handler.verb=='DELETE'){
            console.log("Adding DELETE router for: " + handlersFiles[i] +' for URL:' + handler.path);
            router.delete(handler.path,handler.handleRequest);
        }else if (handler.verb=='PUT'){
            console.log("Adding PUT router for: " + handlersFiles[i] +' for URL:' + handler.path);
            router.put(handler.path,handler.handleRequest);
        }
    }
}


/*

    handlers[0].forEach(function(item){
        console.log("Adding router for path:\"" + item.path + "\" named: " + item.handler.handlerName);
        router.get(item.path,item.handler.handleRequest);
    }

    */


//    router.get('/', function(req, res) {
//        res.json({ message: 'hooray! welcome to our api!' });
//    }
   // );
//}
