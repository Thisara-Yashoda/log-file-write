import { TErrorType, TLogLevel } from "./type";

export function generateSlackMessageBlocks(errorType: TErrorType, errorMessage: string, logLevel: TLogLevel) {
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
                    "text": `${errorText} - Yay! Everything is working fine. 🎉 \n ${errorMessage}`,
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
                    "text": `${errorText} - Oh no! There's an issue in the database.📉 \n ${errorMessage}`,
                    "emoji": true
                }
            });
            break;
        case 'network':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `${errorText} - Oops! Looks like a network hiccup! 🌐 \n ${errorMessage}`,
                    "emoji": true
                }
            });
            break;
        case 'server':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `${errorText} - Uh oh! The server is not responding. 🖥️ \n ${errorMessage}`,
                    "emoji": true
                }
            });
            break;
        case 'client':
            blocks.push({
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `${errorText} - Yikes! Something went wrong on the client side. 🤖 \n ${errorMessage}`,
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
                    "text": `${errorText} - Yikes! An error just occurred. 😱 \n ${errorMessage}`,
                    "emoji": true
                }
            });
    }

    return blocks;
}