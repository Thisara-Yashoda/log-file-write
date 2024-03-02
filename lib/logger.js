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
const axios = require('axios');
const customizeMasg_1 = require("./customizeMasg");
const path = require("path");
let currentTime = "";
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
function logger(options, logLevel, errorMessage, serviceName, methodName, errorObj, errorType, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log messages based on log-level
            if ((options.logLevel.toLowerCase() === "prod" && (logLevel.toLowerCase() === "debug" || logLevel.toLowerCase() === "trace")) ||
                (options.logLevel.toLowerCase() === "prod-trace" && logLevel.toLowerCase() === "debug")) {
                return;
            }
            // Compute filename and timestamp
            const fileName = options.dateBasedFileNaming ? yield GetCurrentDateFileName() : yield GetLogFileName();
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
                    yield axios.post(options.slackWebhookUrl, {
                        blocks: (0, customizeMasg_1.generateSlackMessageBlocks)(errorType, errorLine, logLevel)
                    });
                }
                catch (err) {
                    console.log("Slack log submission failed ", err.message || "Unknown error");
                }
            }
            // delete old logs
            if (options.logsDeletePeriodInDays) {
                try {
                    //current date
                    const currentDate = moment().tz(options.timeZone);
                    //substract days from current date
                    let date = moment(currentDate).subtract(options.logsDeletePeriodInDays, 'days');
                    //get all files
                    const files = fs.readdirSync(options.folderPath);
                    //filter files based on date before
                    const filteredFiles = files.filter((file) => {
                        const fileDate = moment(file.split('_')[1], options.dateFormat + options.fileNameExtension.split('.')[1]);
                        return fileDate.isBefore(date);
                    });
                    //delete files
                    filteredFiles.forEach((file) => {
                        fs.unlinkSync(path.join(options.folderPath, file));
                    });
                }
                catch (err) {
                    console.error("Error occurred while deleting old logs: ", err.message || "Unknown error");
                }
            }
            // Append error line to log file
            fs.appendFile(fileName, errorLine + "\n", (err) => {
                if (err) {
                    console.log("Node file logger Error: " + err);
                }
                if (typeof callback === 'function') {
                    callback(err);
                }
            });
        }
        catch (err) {
            console.error("Error occurred in logger function: ", err.message || "Unknown error");
        }
    });
}
exports.logger = logger;
