import { HttpResponse } from "./protocols"

const created = <T>(body: any): HttpResponse<T> => {
    return {
        statusCode: 201,
        body
    }
}

const ok = <T>(body: any): HttpResponse<T> => {
    return {
        statusCode: 200,
        body
    }
}

const badRequest = (message: string): HttpResponse<string> => {
    return {
        statusCode: 400,
        body: message
    }
}

const serverError = (): HttpResponse<string> => {
    return {
        statusCode: 500,
        body: 'Something went wrong'
    }
}

export {
    badRequest,
    created,
    serverError,
    ok
}