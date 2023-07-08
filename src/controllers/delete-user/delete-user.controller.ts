import User from "../../models/user.model";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

class DeleteUserController implements IController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) { }
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id

            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Missing user id'
                }
            }

            const deletedUser = await this.deleteUserRepository.deleteUser(id)

            return {
                statusCode: 200,
                body: deletedUser
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Something went wrong'
            }
        }
    }
}

export default DeleteUserController