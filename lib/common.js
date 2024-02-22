"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLogFileName = exports.GetCurrentDateFileName = exports.SetOptions = exports.ValidateOptions = void 0;
//let defaultOptions = require("./config");
const type_1 = require("./type");
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
/**
 * Validates the options object for the logger.
 * @param options - The options object to validate.
 * @returns The validated options object.
 */
function ValidateOptions(options) {
    const mergedOptions = Object.assign(Object.assign({}, type_1.defaultOptions), options);
    try {
        if (mergedOptions.folderPath && !fs.existsSync(mergedOptions.folderPath)) {
            fs.mkdirSync(mergedOptions.folderPath);
        }
    }
    catch (ex) {
        console.log(`Node File Logger Warning: Error occurred while creating log folder. Set to default: ${type_1.defaultOptions.folderPath}`);
    }
    if (mergedOptions.timeZone && !moment.tz.zone(mergedOptions.timeZone)) {
        console.log(`Node File Logger Warning: Invalid timezone. Set to default: ${type_1.defaultOptions.timeZone}`);
        mergedOptions.timeZone = type_1.defaultOptions.timeZone;
    }
    if (mergedOptions.logLevel &&
        !["debug", "prod", "prod-trace"].includes(mergedOptions.logLevel.toLowerCase())) {
        console.log(`Node File Logger Warning: Invalid log level. Will be set to default: ${type_1.defaultOptions.logLevel}`);
        mergedOptions.logLevel = type_1.defaultOptions.logLevel;
    }
    return mergedOptions;
}
exports.ValidateOptions = ValidateOptions;
// Set options
function SetOptions(options) {
    return options ? ValidateOptions(options) : Object.assign({}, type_1.defaultOptions);
}
exports.SetOptions = SetOptions;
// Get current date file name
function GetCurrentDateFileName() {
    const { folderPath, fileNamePrefix, fileNameSuffix, fileNameExtension, dateFormat, timeZone } = type_1.defaultOptions;
    const fileName = `${fileNamePrefix}${moment.tz(timeZone).format(dateFormat)}${fileNameSuffix}${fileNameExtension}`;
    const fileLocation = path.join(folderPath, fileName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    return fileLocation;
}
exports.GetCurrentDateFileName = GetCurrentDateFileName;
// Get log file name
function GetLogFileName() {
    const { folderPath, fileName, fileNameExtension } = type_1.defaultOptions;
    return path.join(folderPath, `${fileName}${fileNameExtension}`);
}
exports.GetLogFileName = GetLogFileName;
