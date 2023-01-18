// Import libraries
//const fs = require('fs');t
// const moment = require('moment-timezone');
import { logger } from "./logger";
//import { options } from "./config";
//const options = require("./config");
import { SetOptions, ValidateOptions }  from "./common";

interface optionObject {
  folderPath: any;
  timeZone: any;
  dateBasedFileNaming: undefined;
  fileName: string;
  fileNamePrefix: string;
  fileNameSuffix: string;
  fileNameExtension: string;
  dateFormat: any;
  timeFormat: any;
  logLevel: string;
  onlyFileLogging: undefined;
  slackWebhookUrl: undefined;
}
//assine object
let options : optionObject = {
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
  slackWebhookUrl : undefined
}

export function SetUserOptions(option: optionObject) {
  options = ValidateOptions(option);
  SetOptions(options);
}

export function Debug(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(options, "Debug", errorMessage, serviceName, methodName, errorObj, cb);
}

export function Trace(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(options, "Trace", errorMessage, serviceName, methodName, errorObj, cb);
}

export function Info(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(options, "Info", errorMessage, serviceName, methodName, errorObj, cb);
}

export function Warn(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(options, "Warn", errorMessage, serviceName, methodName, errorObj, cb);
}

export function Error(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(options, "Error", errorMessage, serviceName, methodName, errorObj, cb);
}

export function Fatal(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(options, "Fatal", errorMessage, serviceName, methodName, errorObj, cb);
}

export function Log(
  logLevel: any,
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  cb: any
) {
  logger(
    options,
    logLevel,
    errorMessage,
    serviceName,
    methodName,
    errorObj,
    cb
  );
}
