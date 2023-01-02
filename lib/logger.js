"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs = require("fs");
const { GetCurrentDateFileName, GetLogFileName } = require("./common");
const moment = require("moment-timezone");
const stringify = require("node-stringify");
let currentTime = "";
function logger(options, logLevel, errorMessage, serviceName, methodName, errorObj, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log messages based on log-level
            // If logLevel is prod or prod-trace then dont log debug/trace messages
            if (options.logLevel.toLowerCase() === "prod") {
                if (logLevel) {
                    if (logLevel.toLowerCase() === "debug" ||
                        logLevel.toLowerCase() === "trace")
                        return;
                }
            }
            if (options.logLevel.toLowerCase() === "prod-trace") {
                if (logLevel) {
                    if (logLevel.toLowerCase() === "debug")
                        return;
                }
            }
            // Compute filename and timestamp
            let fileName = "";
            if (options.dateBasedFileNaming) {
                fileName = yield GetCurrentDateFileName();
            }
            else {
                fileName = yield GetLogFileName();
            }
            let time = moment().tz(options.timeZone).format(options.timeFormat);
            let date = moment().tz(options.timeZone).format(options.dateFormat);
            if (options.dateBasedFileNaming) {
                currentTime = time;
            }
            else {
                currentTime = date + " " + time;
            }
            let errorLine = "";
            try {
                errorLine =
                    currentTime +
                        " | " +
                        logLevel
                        +
                            " | " +
                        stringify(errorMessage) +
                        " | " +
                        (serviceName ? "Service: " + serviceName + " | " : "") +
                        (methodName ? "Method: " + methodName + " | " : "") +
                        (errorObj ? "\n" + stringify(errorObj) : "") +
                        "\n";
            }
            catch (err) {
                errorLine =
                    currentTime +
                        " | " +
                        logLevel
                        +
                            " | " +
                        stringify(errorMessage) +
                        " | " +
                        (serviceName ? "Service: " + serviceName + " | " : "") +
                        (methodName ? "Method: " + methodName + " | " : "") +
                        "Error object could not be logged" +
                        "\n";
            }
            // Log to console if needed
            if (!options.onlyFileLogging) //console.log(errorLine);
                fs.appendFile(fileName, errorLine, (err) => {
                    if (err) {
                        //console.log("Node file logger Error: " + err);
                    }
                    if (callback)
                        callback(err);
                });
        }
        catch (ex) { }
    });
}
exports.logger = logger;
;
