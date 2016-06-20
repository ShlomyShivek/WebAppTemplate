function toJson(errorCode, message) {
    return {
        err: errorCode,
        message: message
    };
}
exports.toJson = toJson;
;
var apiErrorCodes_1 = require("./apiErrorCodes");
exports.ApiErrorCodes = apiErrorCodes_1.ApiErrorCodes;
var servicesErrorCodes_1 = require("./servicesErrorCodes");
exports.ServicesErrorCodes = servicesErrorCodes_1.ServiceErrorCodes;
//# sourceMappingURL=errorCodes.js.map