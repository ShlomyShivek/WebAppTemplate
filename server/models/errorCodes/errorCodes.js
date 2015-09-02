errorCodes={
    ApiErrorCodes:require('./apiErrorCodes'),
    ServicesErrorCodes:require('./servicesErrorCodes'),
    toJson:function(errorCode, message){
        "use strict";
        return {
            err:errorCode,
            message:message
        };
    }
};

module.exports=errorCodes;
