var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function registerModel(appData) {
    var path = require('path');
    var fileName = module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
    console.log('registering dbmodel:' + fileName);
    mongoose.model(fileName, appData);
}


module.exports = function() {
    var appData = new Schema({
        date     : Date
        , activity      : String
    });
    registerModel(appData);
};

