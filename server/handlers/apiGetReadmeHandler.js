//the url path to be used for this handler
exports.path='/readme';

//the http verb to be used for this handler
exports.verb='GET';

//handler business logic
exports.handleRequest=[handler];

function handler(req, res){

    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    var fs = require('fs');
    var fileContent = fs.readFileSync('../ReadMe', 'utf8');
    res.json({ message: fileContent });
}
