//let defaultOptions = require("./config");
import { defaultOptions } from "./config";
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");

export function ValidateOptions(options: {
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
}): any {
  let warningPrefix = "Node File Logger Warning: ";

  // Validate folder name
  try {
    if (options.folderPath) {
      if (!fs.existsSync(options.folderPath)) fs.mkdirSync(options.folderPath);
      
      defaultOptions.folderPath = options.folderPath;
    }
  } catch (ex) {
    console.log(
      warningPrefix +
        "Error occured while creating log folder. Set to default: " +
        defaultOptions.folderPath
    );
  }

  // Validate time zone
  if (options.timeZone) {
    if (moment.tz.zone(options.timeZone)) {
      defaultOptions.timeZone = options.timeZone;
    } else {
      console.log(
        warningPrefix +
          "Invalid timezone. Set to default: " +
          defaultOptions.timeZone
      );
    }
  }

  

  // Validate file name extension
  if (options.fileNameExtension)
    defaultOptions.fileNameExtension = options.fileNameExtension.trim();

  // Validate dateFormat and timeFormat
  if (options.dateFormat) defaultOptions.dateFormat = options.dateFormat;
  if (options.timeFormat) defaultOptions.timeFormat = options.timeFormat;

  // Validate log levels
  if (options.logLevel) {
    if (
      options.logLevel.toLowerCase() !== "debug" &&
      options.logLevel.toLowerCase() !== "prod" &&
      options.logLevel.toLowerCase() !== "prod-trace"
    ) {
      console.log(
        warningPrefix +
          "Invalid log level. Will be set to default: " +
          defaultOptions.logLevel
      );
    } else {
      defaultOptions.logLevel = options.logLevel;
    }
  }

  // Validate onlyFileLogging
  if (options.onlyFileLogging !== undefined)
    defaultOptions.onlyFileLogging = options.onlyFileLogging;

  return defaultOptions;
}

export function SetOptions(options: {
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
}) : any{
  return options ? options : defaultOptions;
}

export function GetCurrentDateFileName() {
  let folderPath = defaultOptions.folderPath;

  let fileName =
    defaultOptions.fileNamePrefix +
    moment.tz(defaultOptions.timeZone).format(defaultOptions.dateFormat) +
    defaultOptions.fileNameSuffix + 
    defaultOptions.fileNameExtension;
    

  let fileLocation = path.join(folderPath, fileName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  return fileLocation;
}

export function GetLogFileName() {
  let filePath = path.join(
    defaultOptions.folderPath,
    defaultOptions.fileName + defaultOptions.fileNameExtension
  );

  return filePath;
}
