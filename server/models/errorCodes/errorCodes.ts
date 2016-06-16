export function toJson(errorCode:number, message:string){
    return {
        err:errorCode,
        message:message
    };
}

export * from "./apiErrorCodes";
export * from "./servicesErrorCodes";
