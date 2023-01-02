"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLogFileName = exports.GetCurrentDateFileName = exports.SetOptions = exports.ValidateOptions = void 0;
//let defaultOptions = require("./config");
const config_1 = require("./config");
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
function ValidateOptions(options) {
    let warningPrefix = "Node File Logger Warning: ";
    // Validate folder name
    try {
        if (options.folderPath) {
            if (!fs.existsSync(options.folderPath))
                fs.mkdirSync(options.folderPath);
            config_1.defaultOptions.folderPath = options.folderPath;
        }
    }
    catch (ex) {
        console.log(warningPrefix +
            "Error occured while creating log folder. Set to default: " +
            config_1.defaultOptions.folderPath);
    }
    // Validate time zone
    if (options.timeZone) {
        if (moment.tz.zone(options.timeZone)) {
            config_1.defaultOptions.timeZone = options.timeZone;
        }
        else {
            console.log(warningPrefix +
                "Invalid timezone. Set to default: " +
                config_1.defaultOptions.timeZone);
        }
    }
    // Validate file name extension
    if (options.fileNameExtension)
        config_1.defaultOptions.fileNameExtension = options.fileNameExtension.trim();
    // Validate dateFormat and timeFormat
    if (options.dateFormat)
        config_1.defaultOptions.dateFormat = options.dateFormat;
    if (options.timeFormat)
        config_1.defaultOptions.timeFormat = options.timeFormat;
    // Validate log levels
    if (options.logLevel) {
        if (options.logLevel.toLowerCase() !== "debug" &&
            options.logLevel.toLowerCase() !== "prod" &&
            options.logLevel.toLowerCase() !== "prod-trace") {
            console.log(warningPrefix +
                "Invalid log level. Will be set to default: " +
                config_1.defaultOptions.logLevel);
        }
        else {
            config_1.defaultOptions.logLevel = options.logLevel;
        }
    }
    // Validate onlyFileLogging
    if (options.onlyFileLogging !== undefined)
        config_1.defaultOptions.onlyFileLogging = options.onlyFileLogging;
    return config_1.defaultOptions;
}
exports.ValidateOptions = ValidateOptions;
function SetOptions(options) {
    return options ? options : config_1.defaultOptions;
}
exports.SetOptions = SetOptions;
function GetCurrentDateFileName() {
    let folderPath = config_1.defaultOptions.folderPath;
    let fileName = config_1.defaultOptions.fileNamePrefix +
        moment.tz(config_1.defaultOptions.timeZone).format(config_1.defaultOptions.dateFormat) +
        config_1.defaultOptions.fileNameSuffix +
        config_1.defaultOptions.fileNameExtension;
    let fileLocation = path.join(folderPath, fileName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    return fileLocation;
}
exports.GetCurrentDateFileName = GetCurrentDateFileName;
function GetLogFileName() {
    let filePath = path.join(config_1.defaultOptions.folderPath, config_1.defaultOptions.fileName + config_1.defaultOptions.fileNameExtension);
    return filePath;
}
exports.GetLogFileName = GetLogFileName;
