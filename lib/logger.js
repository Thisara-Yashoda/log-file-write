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
                console.log('====================================');
                console.log(errorLine);
                console.log('====================================');
            }
            // Slack logs if needed
            if (options.slackWebhookUrl) {
                try {
                    //submit log to slack
                    yield axios.post(options.slackWebhookUrl, {
                        blocks: generateSlackMessageBlocks(errorType, errorMessage, logLevel)
                    });
                }
                catch (err) {
                    console.log("Slack log submission failed ", err);
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
        catch (ex) {
            console.error("Error occurred in logger function: ", ex);
        }
    });
}
exports.logger = logger;
function generateSlackMessageBlocks(errorType, errorMessage, logLevel) {
    let blocks = [];
    let errorText = "";
    // Customize error text based on error type
    switch (logLevel) {
        case "Debug":
            errorText = "Debugging Information 🐞";
            break;
        case "Trace":
            errorText = "Trace Information 🔍";
            break;
        case "Info":
            errorText = "Information ℹ️";
            break;
        case "Warn":
            errorText = "Warning ⚠️";
            break;
        case "Error":
            errorText = "Error ❌";
            break;
        case "Fatal":
            errorText = "Fatal Error 💀";
            break;
        case "Success":
            errorText = "Success ✅";
            //return;
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `"${errorText} - Yay! Everything is working fine. 🎉 \n ${errorMessage}"`,
                    "emoji": true
                }
            });
            return blocks;
        default:
            errorText = "Error ❌";
    }
    // Customize blocks based on log level
    switch (errorType) {
        case 'database':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `"${errorText} - Oh no! There's an issue in the database.📉 \n ${errorMessage}"`,
                    "emoji": true
                }
            });
            break;
        case 'network':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `"${errorText} - Oops! Looks like a network hiccup! 🌐 \n ${errorMessage}"`,
                    "emoji": true
                }
            });
            break;
        case 'server':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `"${errorText} - Uh oh! The server is not responding. 🖥️ \n ${errorMessage}"`,
                    "emoji": true
                }
            });
            break;
        case 'client':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `"${errorText} - Yikes! Something went wrong on the client side. 🤖 \n ${errorMessage}"`,
                    "emoji": true
                }
            });
            break;
        default:
            // Default block if log level is not recognized
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `"${errorText} - Yikes! An error just occurred. 😱 \n ${errorMessage}"`,
                    "emoji": true
                }
            });
    }
    return blocks;
}
