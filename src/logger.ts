const fs = require("fs");
const { GetCurrentDateFileName, GetLogFileName } = require("./common");
const moment = require("moment-timezone");
const stringify = require("node-stringify");
const axios = require('axios')
import { generateSlackMessageBlocks } from "./customizeMasg";
import { TDefaultOptions, TErrorType, TLogLevel } from "./type";
import path = require('path');

let currentTime: string = "";

/**
 * Logs an error message to a file and performs additional actions based on the provided options.
 * @param options - The options for logging.
 * @param logLevel - The log level of the error message.
 * @param errorMessage - The error message to be logged.
 * @param serviceName - The name of the service associated with the error.
 * @param methodName - The name of the method associated with the error.
 * @param errorObj - Additional error object to be logged.
 * @param callback - A callback function to be called after logging is completed.
 */
export async function logger(
  options: TDefaultOptions,
  logLevel: TLogLevel,
  errorMessage: any,
  serviceName: string,
  methodName: string,
  errorObj: any,
  errorType: TErrorType,
  callback: (error: string | null) => void
) {
  try {
    // Log messages based on log-level
    if ((options.logLevel.toLowerCase() === "prod" && (logLevel.toLowerCase() === "debug" || logLevel.toLowerCase() === "trace")) ||
      (options.logLevel.toLowerCase() === "prod-trace" && logLevel.toLowerCase() === "debug")) {
      return;
    }

    // Compute filename and timestamp
    const fileName = options.dateBasedFileNaming ? await GetCurrentDateFileName() : await GetLogFileName();
    const time = moment().tz(options.timeZone).format(options.timeFormat);
    const date = moment().tz(options.timeZone).format(options.dateFormat);
    currentTime = options.dateBasedFileNaming ? time : `${date} ${time}`;

    let errorLine = `${currentTime} | ${logLevel} | ${JSON.stringify(errorMessage)} | ` +
      (serviceName ? `Service: ${serviceName} | ` : "") +
      (methodName ? `Method: ${methodName} | ` : "") +
      (errorObj ? `\n${JSON.stringify(errorObj)}` : "");

    // Log to console if needed
    if (options.onlyFileLogging) {
      console.log(errorLine);
    }

    // Slack logs if needed
    if (options.slackWebhookUrl && options.slackWebhookUrl !== "") {
      try {
        //submit log to slack
        await axios.post(options.slackWebhookUrl, {
          blocks: generateSlackMessageBlocks(errorType as TErrorType, errorLine, logLevel as TLogLevel)
        });
      } catch (err: any | unknown) {
        console.log("Slack log submission failed ", err.message || "Unknown error");
      }
    }

    // delete old logs
    if (options.logsDeletePeriodInDays) {
      try {
        //current date
        const currentDate = moment().tz(options.timeZone);

        //substract days from current date
        let date = moment(currentDate).subtract(options.logsDeletePeriodInDays, 'days')

        //get all files
        const files = fs.readdirSync(options.folderPath);

        //filter files based on date before
        const filteredFiles = files.filter((file: string) => {
          const fileDate = moment(file.split('_')[1], options.dateFormat + options.fileNameExtension.split('.')[1]);
          return fileDate.isBefore(date);
        });

        //delete files
        filteredFiles.forEach((file: string) => {
          fs.unlinkSync(path.join(options.folderPath, file));
        });

      }
      catch (err: any | unknown) {
        console.error("Error occurred while deleting old logs: ", err.message || "Unknown error");
      }
    }

    // Append error line to log file
    fs.appendFile(fileName, errorLine + "\n", (err: string) => {
      if (err) {
        console.log("Node file logger Error: " + err);
      }
      if (typeof callback === 'function') {
        callback(err);
      }
    })
  } catch (err: any | unknown) {
    console.error("Error occurred in logger function: ", err.message || "Unknown error");
  }

}




