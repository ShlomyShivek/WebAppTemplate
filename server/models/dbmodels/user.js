var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
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
        username: {
            type: String,
            unique: 'testing error message',
            required: 'Please fill in a username',
            trim: true
        },
        password: {
            type: String,
            default: '',
            validate: [validateLocalStrategyPassword, 'Password should be longer']
        },
        salt: {
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerData: {},
        additionalProvidersData: {},
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
        /* For reset password */
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        }
    });

    user.methods.isUserNameValid= function () {
        "use strict";
        //TODO: implement username validation logic
      return true;
    };

    user.methods.isPasswordValid=function(){
        "use strict";
        //TODO: implement password validation logic
        return true;
    }

    user.methods.isValid=function(){
        "use strict";

        let result=false;
        if(this.isUserNameValid() && this.isPasswordValid()){
            result=true;
        }

        return result;
    };

    user.methods.toString=function(){
        return this.username;
    }

    registerModel(user);
};

