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
 * A Validation function for local strategy password
*/
var validateLocalStrategyPassword = function(password) {
    return (password && password.length > 6);
};


module.exports = function() {
    var authentication = new Schema({
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

    authentication.methods.isUserNameValid= function () {
        "use strict";
        //TODO: implement username validation logic
        return true;
    };

    authentication.methods.encryptPassword=function(decryptedPassword, salt){
        var encryptedPassword=null;
        if (this.isDecryptedPasswordValid(decryptedPassword)) {
            encryptedPassword = crypto.pbkdf2Sync(decryptedPassword, salt, 10000, 64).toString('base64');
        }
        return encryptedPassword;
    }

    authentication.methods.isDecryptedPasswordValid=function(decryptedPassword) {
        return (decryptedPassword && decryptedPassword.length > 6);
    };

    authentication.methods.isValid=function(){
        "use strict";

        let result=false;
        if(this.isUserNameValid() && this.isDecryptedPasswordValid (this.password)){
            result=true;
        }

        return result;
    };

    authentication.methods.toString=function(){
        return this.username;
    }

    //Hook a pre save method to hash the password
    authentication.pre('save', function(next) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        if (this.isDecryptedPasswordValid(this.password)) {
            this.password=this.encryptPassword(this.password,this.salt);
            next();
        }else{
            var err = new Error('invalid password');
            err.errorCode=1;
            next(err);
        }
    });

    registerModel(authentication);
};





