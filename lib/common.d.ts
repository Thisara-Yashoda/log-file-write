import { TDefaultOptions } from "./type";
/**
 * Validates the options object for the logger.
 * @param options - The options object to validate.
 * @returns The validated options object.
 */
export declare function ValidateOptions(options: TDefaultOptions): TDefaultOptions;
export declare function SetOptions(options: TDefaultOptions): TDefaultOptions;
export declare function GetCurrentDateFileName(): string;
export declare function GetLogFileName(): string;
export declare function SetDeleteTimeDate(deleteTimeDate: number): void;
export declare function GetDeleteTimeDate(): number | undefined;
