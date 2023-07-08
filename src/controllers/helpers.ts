import { HttpResponse, HttpStatusCode } from "./protocols"

const created = <T>(body: any): HttpResponse<T> => {
    return {
        statusCode: HttpStatusCode.CREATED,
        body
    }
}

const ok = <T>(body: any): HttpResponse<T> => {
    return {
        statusCode: HttpStatusCode.OK,
        body
    }
}

const badRequest = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message
    }
}

const serverError = (): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: 'Something went wrong'
    }
}

export {
    badRequest,
    created,
    serverError,
    ok
}