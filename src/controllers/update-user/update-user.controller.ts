import User from "../../models/user.model";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols";

class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
    async handle(httpRequest: HttpRequest<IUpdateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id
            const body = httpRequest?.body

            if (!id) return badRequest('Missing user id')

            if (!body) return badRequest('Body missing fields')

            const allowedFieldsToUpdated: (keyof IUpdateUserParams)[] = [
                "firstName",
                "lastName",
                "password"
            ]

            const someFieldIsNotAllowedToUpdated = Object.keys(body)
                .some(key => !allowedFieldsToUpdated
                    .includes(key as keyof IUpdateUserParams))

            if (someFieldIsNotAllowedToUpdated) return badRequest('Some received field is not allowed')

            const user = await this.updateUserRepository.updateUser(id, body)

            return ok<User>(user)
        } catch (error) {
            return serverError()
        }
    }
}

export default UpdateUserController