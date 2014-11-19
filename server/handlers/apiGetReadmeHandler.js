//the url path to be used for this handler
exports.path='/readme';

//the http verb to be used for this handler
exports.verb='GET';

//handler business logic
exports.handleRequest=function(req, res){
    var fs = require('fs');
    var fileContent = fs.readFileSync('..\\ReadMe', 'utf8');
    res.json({ message: fileContent });
}
