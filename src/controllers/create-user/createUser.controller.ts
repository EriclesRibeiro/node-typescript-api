import User from "../../models/user.model";
import { HttpRequest, HttpResponse } from "../protocols";
import { ICreateUserController, ICreateUserParams, ICreateUserRepository } from "./protocols";

class CreateUserController implements ICreateUserController {

    constructor(private readonly createUserRepository: ICreateUserRepository) { }

    async handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User>> {
        try {
            // Validar se body existe
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: 'Please specify a body'
                }
            }

            const { body } = httpRequest

            const user = await this.createUserRepository.createUser(body)
            return {
                statusCode: 201,
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

export default CreateUserController
