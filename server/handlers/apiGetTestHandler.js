//the url path to be used for this handler
exports.path='/';

//the http verb to be used for this handler
exports.verb='GET';

exports.handleRequest=function(req, res){
    res.json({ message: 'hooray! welcome to our api!!!!!' });
}