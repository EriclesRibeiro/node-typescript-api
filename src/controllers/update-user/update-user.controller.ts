import User from "../../models/user.model";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserParams, IUpdateUserRepository } from "./protocols";

class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id
            const body = httpRequest?.body

            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Missing user id'
                }
            }

            const allowedFieldsToUpdated: (keyof IUpdateUserParams)[] = [
                "firstName",
                "lastName",
                "password"
            ]

            const someFieldIsNotAllowedToUpdated = Object.keys(body)
                .some(key => !allowedFieldsToUpdated
                    .includes(key as keyof IUpdateUserParams))

            if (someFieldIsNotAllowedToUpdated) {
                return {
                    statusCode: 400,
                    body: 'Some received field is not allowed'
                }
            }

            const user = await this.updateUserRepository.updateUser(id, body)

            return {
                statusCode: 200,
                body: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Something went wrong'
            }
        }
    }
}

export default UpdateUserController