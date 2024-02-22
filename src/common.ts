//let defaultOptions = require("./config");
import { TDefaultOptions, defaultOptions } from "./type";
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");



/**
 * Validates the options object for the logger.
 * @param options - The options object to validate.
 * @returns The validated options object.
 */
export function ValidateOptions(options: TDefaultOptions): TDefaultOptions {
  const mergedOptions: TDefaultOptions = { ...defaultOptions, ...options };

  try {
    if (mergedOptions.folderPath && !fs.existsSync(mergedOptions.folderPath)) {
      fs.mkdirSync(mergedOptions.folderPath);
    }
  } catch (ex) {
    console.log(`Node File Logger Warning: Error occurred while creating log folder. Set to default: ${defaultOptions.folderPath}`);
  }

  if (mergedOptions.timeZone && !moment.tz.zone(mergedOptions.timeZone)) {
    console.log(`Node File Logger Warning: Invalid timezone. Set to default: ${defaultOptions.timeZone}`);
    mergedOptions.timeZone = defaultOptions.timeZone;
  }

  if (mergedOptions.logLevel &&
    !["debug", "prod", "prod-trace"].includes(mergedOptions.logLevel.toLowerCase())) {
    console.log(`Node File Logger Warning: Invalid log level. Will be set to default: ${defaultOptions.logLevel}`);
    mergedOptions.logLevel = defaultOptions.logLevel;
  }

  return mergedOptions;
}

// Set options
export function SetOptions(options: TDefaultOptions): TDefaultOptions {
  return options ? ValidateOptions(options) : { ...defaultOptions };
}

// Get current date file name
export function GetCurrentDateFileName(): string {
  const { folderPath, fileNamePrefix, fileNameSuffix, fileNameExtension, dateFormat, timeZone } = defaultOptions;
  const fileName = `${fileNamePrefix}${moment.tz(timeZone).format(dateFormat)}${fileNameSuffix}${fileNameExtension}`;
  const fileLocation = path.join(folderPath, fileName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  return fileLocation;
}

// Get log file name
export function GetLogFileName(): string {
  const { folderPath, fileName, fileNameExtension } = defaultOptions;
  return path.join(folderPath, `${fileName}${fileNameExtension}`);
}
