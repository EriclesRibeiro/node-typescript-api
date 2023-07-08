interface HttpResponse<T> {
    statusCode: number;
    body: T | string
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
    IController
}