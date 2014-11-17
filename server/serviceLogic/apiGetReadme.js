/**
 * Created by shlomy.shivek on 11/17/2014.
 */
//Return to the client to content of the ReadMe file
exports.handlerName = "apiGetReadme";
exports.handleRequest=function(req, res){
    var fs = require('fs');
    var fileContent = fs.readFileSync('..\\ReadMe', 'utf8');
    res.json({ message: fileContent });
}