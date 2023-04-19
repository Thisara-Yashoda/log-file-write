"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.Fatal = exports.Errors = exports.Warn = exports.Info = exports.Trace = exports.Debug = exports.SetUserOptions = void 0;
// Import libraries
//const fs = require('fs');t
// const moment = require('moment-timezone');
const logger_1 = require("./logger");
//import { options } from "./config";
//const options = require("./config");
const common_1 = require("./common");
//assine object
let options = {
    folderPath: undefined,
    timeZone: undefined,
    dateBasedFileNaming: undefined,
    fileName: "",
    fileNamePrefix: "",
    fileNameSuffix: "",
    fileNameExtension: "",
    dateFormat: undefined,
    timeFormat: undefined,
    logLevel: "",
    onlyFileLogging: undefined,
    slackWebhookUrl: undefined
};
function SetUserOptions(option) {
    options = (0, common_1.ValidateOptions)(option);
    (0, common_1.SetOptions)(options);
}
exports.SetUserOptions = SetUserOptions;
function Debug(errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, "Debug", errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Debug = Debug;
function Trace(errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, "Trace", errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Trace = Trace;
function Info(errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, "Info", errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Info = Info;
function Warn(errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, "Warn", errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Warn = Warn;
function Errors(errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, "Error", errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Errors = Errors;
function Fatal(errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, "Fatal", errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Fatal = Fatal;
function Log(logLevel, errorMessage, serviceName, methodName, errorObj, cb) {
    (0, logger_1.logger)(options, logLevel, errorMessage, serviceName, methodName, errorObj, cb);
}
exports.Log = Log;
