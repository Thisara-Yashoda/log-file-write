import { TErrorType, TLogLevel } from "./type";
export declare function generateSlackMessageBlocks(errorType: TErrorType, errorMessage: string, logLevel: TLogLevel): {
    type: string;
    text: {
        type: string;
        text: string;
        emoji: boolean;
    };
}[];
