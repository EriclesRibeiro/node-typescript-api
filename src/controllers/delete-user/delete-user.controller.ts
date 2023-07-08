import User from "../../models/user.model";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

class DeleteUserController implements IController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) { }
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id

            if (!id) {
                return badRequest('Missing user id')
            }

            const deletedUser = await this.deleteUserRepository.deleteUser(id)

            return ok<User>(deletedUser)

        } catch (error) {
            return serverError()
        }
    }
}

export default DeleteUserController