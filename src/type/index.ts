export type TDefaultOptions = {
    timeZone: string;
    folderPath: string;
    dateBasedFileNaming: boolean;
    fileName: string;
    fileNamePrefix: string;
    fileNameSuffix: string;
    fileNameExtension: string;
    dateFormat: string;
    timeFormat: string;
    logLevel: string;
    onlyFileLogging: boolean;
    slackWebhookUrl: string;
};

export const defaultOptions: TDefaultOptions = {
    timeZone: 'America/Resolute',
    folderPath: './logs',
    dateBasedFileNaming: true,
    fileName: 'Global_Logs',
    fileNamePrefix: 'Logs_',
    fileNameSuffix: 'file',
    fileNameExtension: '.log',
    dateFormat: 'YYYY-M-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'debug',
    onlyFileLogging: false,
    slackWebhookUrl: ''
};

//error type
export type TLogLevel = "Debug" | "Trace" | "Info" | "Warn" | "Error" | "Fatal" | "Success" | "Log" | "Other";


//log level type server
export type TErrorType = "database" | "network" | "server" | "client" | "other";

