// Import libraries
import { logger } from "./logger";
import { SetOptions, ValidateOptions } from "./common";
import { TDefaultOptions, TErrorType, TLogLevel, defaultOptions } from "./type"

let options = defaultOptions;

export function SetUserOptions(option: TDefaultOptions) {
  options = ValidateOptions(option);
  SetOptions(options);
}

export function Debug(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Debug", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}

export function Trace(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Trace", errorMessage, serviceName, methodName, errorObj, errorType, cb);

}

export function Info(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Info", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}

export function Warn(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Warn", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}

export function Errors(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Error", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}

export function Fatal(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Fatal", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}

export function Log(
  logLevel: any,
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, logLevel, errorMessage, serviceName, methodName, errorObj, errorType, cb);
}

export function Success(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Success", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}


export function Other(
  errorMessage: any,
  serviceName: any,
  methodName: any,
  errorObj: any,
  errorType: TErrorType,
  cb: any
) {
  logger(options, "Other", errorMessage, serviceName, methodName, errorObj, errorType, cb);
}


