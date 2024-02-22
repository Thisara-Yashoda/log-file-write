import { TDefaultOptions, TErrorType, TLogLevel } from "./type";
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
export declare function logger(options: TDefaultOptions, logLevel: TLogLevel, errorMessage: any, serviceName: string, methodName: string, errorObj: any, errorType: TErrorType, callback: (error: string | null) => void): Promise<void>;
