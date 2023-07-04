interface HttpResponse<T> {
    statusCode: number;
    body: T | string
}

interface HttpRequest<B> {
    body?: B;
    params?: any;
    headers?: any;
}

export {
    HttpResponse,
    HttpRequest
}