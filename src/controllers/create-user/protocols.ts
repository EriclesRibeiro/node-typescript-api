import User from "../../models/user.model"
import { HttpRequest, HttpResponse } from "../protocols";

interface ICreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface ICreateUserRepository {
    createUser(params: ICreateUserParams): Promise<User>
}

interface ICreateUserController {
    handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User>>
}

export {
    ICreateUserParams,
    ICreateUserRepository,
    ICreateUserController
}