import {ApiErrorCodes} from "./apiErrorCodes";
export function toJson(errorCode:number, message:string){
    return {
        err:errorCode,
        message:message
    };
};

export {ApiErrorCodes as ApiErrorCodes} from "./apiErrorCodes";
export {ServiceErrorCodes as ServicesErrorCodes} from "./servicesErrorCodes";
