exports.initialize = function() {

    var fs = require('fs');
    var dbmodelsBasePath = './models/dbmodels/';
    var modelFiles = fs.readdirSync(dbmodelsBasePath);

    var l = modelFiles.length;
    for (var i = 0; i < l; i++) {
        require(dbmodelsBasePath+ modelFiles[i])();
    }
};

exports.getDbModel = function(modelName) {
    var mongoose = require('mongoose');
    var model = mongoose.model(modelName)
    return model;
}