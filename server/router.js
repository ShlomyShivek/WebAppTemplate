exports.GET=0;

exports.initRoutes=function(router) {
    var fs = require('fs');
    var handlersBasePath = './handlers/';

    var recursive = require('recursive-readdir');
    recursive(handlersBasePath, function (err, handlersFiles) {
        // Files is an array of filename
        console.log(handlersFiles);

        var l = handlersFiles.length;
        for (var i = 0; i < l; i++) {
            var handler = require(process.cwd() + '/' + handlersFiles[i]);
            handler.handleRequest.forEach(function(handlingMethod){
                if (handler.verb == 'GET') {
                    console.log("Adding GET router for: " + handlersFiles[i] +' for URL:' + handler.path);
                    router.get(handler.path, handlingMethod);
                }else if (handler.verb=='POST'){
                    console.log("Adding POST router for: " + handlersFiles[i] +' for URL:' + handler.path);
                    router.post(handler.path, handlingMethod);
                }else if (handler.verb=='DELETE'){
                    console.log("Adding DELETE router for: " + handlersFiles[i] +' for URL:' + handler.path);
                    router.delete(handler.path, handlingMethod);
                }else if (handler.verb=='PUT'){
                    console.log("Adding PUT router for: " + handlersFiles[i] +' for URL:' + handler.path);
                    router.put(handler.path, handlingMethod);
                }
            })
        }
    });
};
