"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Other = exports.Success = exports.Log = exports.Fatal = exports.Errors = exports.Warn = exports.Info = exports.Trace = exports.Debug = exports.SetUserOptions = void 0;
// Import libraries
const logger_1 = require("./logger");
const common_1 = require("./common");
const type_1 = require("./type");
let options = type_1.defaultOptions;
function SetUserOptions(option) {
    options = (0, common_1.ValidateOptions)(option);
    (0, common_1.SetOptions)(options);
}
exports.SetUserOptions = SetUserOptions;
function Debug(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Debug", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Debug = Debug;
function Trace(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Trace", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Trace = Trace;
function Info(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Info", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Info = Info;
function Warn(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Warn", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Warn = Warn;
function Errors(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Error", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Errors = Errors;
function Fatal(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Fatal", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Fatal = Fatal;
function Log(logLevel, errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, logLevel, errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Log = Log;
function Success(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Success", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Success = Success;
function Other(errorMessage, serviceName, methodName, errorObj, errorType, cb) {
    (0, logger_1.logger)(options, "Other", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}
exports.Other = Other;
