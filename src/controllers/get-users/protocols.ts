import User from "../../models/user";
import { HttpResponse } from "../protocols";

interface IGetUsersController {
    handler(): Promise<HttpResponse<User[]>>;
}

interface IGetUsersRepository {
    getUsers: Promise<User[]>
}

export {
    IGetUsersController,
    IGetUsersRepository
}