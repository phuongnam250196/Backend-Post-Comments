
export const HttpStatusCodes = {
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    MethodNotAllowed: 405
}

export class HttpError extends  Error {
    constructor(mess, __httpStatusCode) {
        super(mess)
    }

    HttpStatusCode() {
        return this.__httpStatusCode;
    }
}

export const HttpParamsValidators = {
    MustBeString(obj, key, min= 1, max= 512) {
        const k = obj[key];
        console.log('obj', obj, key, k)
        if (typeof k !== "string") {
            console.log(`${key} must be string`);
        }
        if (k.length < min) {
            console.log(`${key} must be at leat ${min} characters`);
        }
        if (k.length > max) {
            console.log(`${key} must be shorter than ${max} characters`);
        }
        return k;
    }
}