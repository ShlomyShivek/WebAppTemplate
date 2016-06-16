(function (ServiceErrorCodes) {
    ServiceErrorCodes[ServiceErrorCodes["UnknownError"] = -1] = "UnknownError";
    ServiceErrorCodes[ServiceErrorCodes["MissingData"] = 100] = "MissingData";
    ServiceErrorCodes[ServiceErrorCodes["DuplicateKey"] = 101] = "DuplicateKey";
    ServiceErrorCodes[ServiceErrorCodes["ItemAlreadyExists"] = 102] = "ItemAlreadyExists";
    ServiceErrorCodes[ServiceErrorCodes["EmployeeNotFound"] = 103] = "EmployeeNotFound";
})(exports.ServiceErrorCodes || (exports.ServiceErrorCodes = {}));
var ServiceErrorCodes = exports.ServiceErrorCodes;
//# sourceMappingURL=servicesErrorCodes.js.map