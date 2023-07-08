import User from "../../models/user.model";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols";

class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
    async handle(httpRequest: HttpRequest<IUpdateUserParams>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id
            const body = httpRequest?.body

            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Missing user id'
                }
            }

            if (!body) {
                return {
                    statusCode: 400,
                    body: 'Body missing fields'
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