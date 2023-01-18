const fs = require("fs");
const { GetCurrentDateFileName, GetLogFileName } = require("./common");
const moment = require("moment-timezone");
const stringify = require("node-stringify");
const axios = require('axios')
let currentTime: any = "";

export async function logger(
  options: {
    logLevel: string;
    dateBasedFileNaming: any;
    timeZone: any;
    timeFormat: any;
    dateFormat: any;
    onlyFileLogging: any;
    slackWebhookUrl: any;
  },
  logLevel: string,
  errorMessage: any,
  serviceName: string,
  methodName: string,
  errorObj: any,
  callback: (arg0: any) => void
) {
  try {
    // Log messages based on log-level
    // If logLevel is prod or prod-trace then dont log debug/trace messages
    if (options.logLevel.toLowerCase() === "prod") {
      if (logLevel) {
        if (
          logLevel.toLowerCase() === "debug" ||
          logLevel.toLowerCase() === "trace"
        )
          return;
      }
    }

    if (options.logLevel.toLowerCase() === "prod-trace") {
      if (logLevel) {
        if (logLevel.toLowerCase() === "debug") return;
      }
    }

    // Compute filename and timestamp
    let fileName = "";
    if (options.dateBasedFileNaming) {
      fileName = await GetCurrentDateFileName();
    } else {
      fileName = await GetLogFileName();
    }

    let time = moment().tz(options.timeZone).format(options.timeFormat);
    let date = moment().tz(options.timeZone).format(options.dateFormat);

    if (options.dateBasedFileNaming) {
      currentTime = time;
    } else {
      currentTime = date + " " + time;
    }

    let errorLine = "";

    try {
      errorLine =
        currentTime +
        " | " +
        logLevel +
        " | " +
        stringify(errorMessage) +
        " | " +
        (serviceName ? "Service: " + serviceName + " | " : "") +
        (methodName ? "Method: " + methodName + " | " : "") +
        (errorObj ? "\n" + stringify(errorObj) : "") +
        "\n";
    } catch (err) {
      errorLine =
        currentTime +
        " | " +
        logLevel +
        " | " +
        stringify(errorMessage) +
        " | " +
        (serviceName ? "Service: " + serviceName + " | " : "") +
        (methodName ? "Method: " + methodName + " | " : "") +
        "Error object could not be logged" +
        "\n";
    }

    // Log to console if needed
    if (options.onlyFileLogging) {
      console.log(errorLine);
    }
    // slack logs if needed
    if (options.slackWebhookUrl) {
     // console.log( "webShocked",options.slackWebhookUrl);
      axios
        .post(
          options.slackWebhookUrl,
          {
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "plain_text",
                  "text": errorLine,
                  "emoji": true
                }
              }
            ]
          }
        )
        .then(() => {
          //res.send('Form submitted!')
          //console.log(" submitted!");
        })
        .catch((err:any) => {
          //res.send('Form submission failed!')
          console.log("failed ",err);
        });
    }

    fs.appendFile(fileName, errorLine, (err: string) => {
      if (err) {
        //console.log("Node file logger Error: " + err);
      }
      if (callback) callback(err);
    });
  } catch (ex) {}
}
