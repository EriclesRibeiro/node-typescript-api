enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
    CREATED = 201,
}

interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    body: T
}

interface HttpRequest<B> {
    body?: B;
    params?: any;
    headers?: any;
}

interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}

export {
    HttpResponse,
    HttpRequest,
    IController,
    HttpStatusCode
}