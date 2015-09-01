var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

function registerModel(appData) {
    var path = require('path');
    var fileName = module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
    console.log('registering dbmodel:' + fileName);
    mongoose.model(fileName, appData);
}


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};


module.exports = function() {
    var user = new Schema({
        firstName: {
            type: String,
            trim: true,
            default: '',
            validate: [validateLocalStrategyProperty, 'Please fill in your first name']
        },
        lastName: {
            type: String,
            trim: true,
            default: '',
            validate: [validateLocalStrategyProperty, 'Please fill in your last name']
        },
        displayName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            default: '',
            validate: [validateLocalStrategyProperty, 'Please fill in your email'],
            match: [/.+\@.+\..+/, 'Please fill a valid email address']
        },
        roles: {
            type: [{
                type: String,
                enum: ['user', 'admin']
            }],
            default: ['user']
        },
        updated: {
            type: Date
        },
        created: {
            type: Date,
            default: Date.now
        },
    });

    user.methods.isValid=function(){
        "use strict";
        //ToDo: add some logic here
        return true;
    };


    user.methods.toString=function(){
        return this.firstName+" "+this.lastName+" "+this.email;
    }
    registerModel(user);
};

