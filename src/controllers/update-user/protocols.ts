import User from "../../models/user.model"
import { HttpRequest, HttpResponse } from "../protocols";

interface IUpdateUserController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}

interface IUpdateUserParams {
    firstName?: string;
    lastName?: string;
    password?: string;
}

interface IUpdateUserRepository {
    updateUser(id: string, params: IUpdateUserParams): Promise<User>
}

export {
    IUpdateUserRepository,
    IUpdateUserParams,
    IUpdateUserController
}