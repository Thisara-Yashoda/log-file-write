interface optionObject {
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
    slackWebhookUrl: undefined;
}
export declare function SetUserOptions(option: optionObject): void;
export declare function Debug(errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export declare function Trace(errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export declare function Info(errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export declare function Warn(errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export declare function Errors(errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export declare function Fatal(errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export declare function Log(logLevel: any, errorMessage: any, serviceName: any, methodName: any, errorObj: any, cb: any): void;
export {};
