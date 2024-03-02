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
    slackWebhookUrl?: string;
    logsDeletePeriodInDays?: number;
};
export declare const defaultOptions: TDefaultOptions;
export type TLogLevel = "Debug" | "Trace" | "Info" | "Warn" | "Error" | "Fatal" | "Success" | "Log" | "Other";
export type TErrorType = "database" | "network" | "server" | "client" | "other";
