//the url path to be used for this handler
exports.path='/';

//the http verb to be used for this handler
exports.verb='GET';

exports.handleRequest=function(req, res){

    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    res.json({ message: 'hooray! welcome to our api!!!!!' });
}