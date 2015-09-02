"use strict";

exports.login=function(credentials, onSuccess, onFailure){
    let passportModule=require('passport');
    passportModule.authenticate('local')
    onSuccess();
}

exports.signup=function(userModel, authModel, onSuccess, onFailure){

    let errorCodes=require('models/errorCodes/errorCodes');
//    let userCollection=require('dbModelsInitiator').getDbModel('user');
    let authCollection=require('dbModelsInitiator').getDbModel('authentication');

    authCollection.findOne({username:authModel.username},function(err,auth){
        if(err){
            console.log('unknown error when trying to look for user in DB: '+err);
            onFailure(errorCodes.ServicesErrorCodes.UnknownError);
        }else{
            if(auth!=null){
                console.log('user already found in DB. cannot create duplicate users: '+authModel.toString());
                onFailure(errorCodes.ServicesErrorCodes.DuplicateKey);
            }else{
                //try to add user
                authModel.provider="usernameProvider";
                authModel.save(function(err,model) {
                    if (err){
                        console.log("failed to save credentials details: %s", err);
                        if(err.errors.password){
                            console.log("invalid password");
                        }
                        onFailure(errorCodes.ServicesErrorCodes.UnknownError);
                    }else{
                        console.log("credentials stored successfully");
                        userModel.authenticationKey=authModel._id;
                        userModel.save(function(err,model){
                            if(err){
                                console.log("failed to save user details in DB: %s", err);
                                console.log("performing rollback for authentication details for user %s",authModel.username);
                                authCollection.remove({username:authModel.username}, function(err){
                                    if(err) {
                                        //failed to remove user
                                        console.log("failed to remove user from authentication collection: %s", err);
                                        onFailure(errorCodes.ServicesErrorCodes.UnknownError);
                                    }
                                    onFailure(errorCodes.ServicesErrorCodes.UnknownError);
                                });
                            }else{
                                console.log("user registered succesfully into DB: %s",model);
                                onSuccess(model);
                            }
                        })
                    }
                });
            }
        }
    });
}

