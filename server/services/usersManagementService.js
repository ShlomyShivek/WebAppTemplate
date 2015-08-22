exports.signup=function(userModel, onSuccess, onFailure){
    userModel.provider="usernameProvider";
    userModel.save(function(err,model) {
        "use strict";
        if (err){
            console.log(err);
            onFailure();
        }else{
            onSuccess();
        }
    });
}