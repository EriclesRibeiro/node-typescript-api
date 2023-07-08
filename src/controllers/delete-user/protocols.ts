import User from "../../models/user.model";
import { HttpRequest, HttpResponse } from "../protocols";

interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>;
}

interface IDeleteUserController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}

export {
    IDeleteUserRepository,
    IDeleteUserController
}