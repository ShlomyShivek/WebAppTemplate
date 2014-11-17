exports.GET=0;

exports.initRoutes=function(router, handlers) {
    handlers[0].forEach(function(item){
        console.log("Adding router for path:\"" + item.path + "\" named: " + item.handler.handlerName);
        router.get(item.path,item.handler.handleRequest);
    }
//    router.get('/', function(req, res) {
//        res.json({ message: 'hooray! welcome to our api!' });
//    }
    );
}
