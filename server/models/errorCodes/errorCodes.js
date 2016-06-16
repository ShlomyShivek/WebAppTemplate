function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
function toJson(errorCode, message) {
    return {
        err: errorCode,
        message: message
    };
}
exports.toJson = toJson;
__export(require("./apiErrorCodes"));
__export(require("./servicesErrorCodes"));
//# sourceMappingURL=errorCodes.js.map