import User from "../../models/user.model";
import { HttpRequest, HttpResponse } from "../protocols";
import { ICreateUserController, ICreateUserParams, ICreateUserRepository } from "./protocols";
import verifyEmptyObject from "../../utils/verify-empty-object";
import validator from "validator";

class CreateUserController implements ICreateUserController {

    constructor(private readonly createUserRepository: ICreateUserRepository) { }

    async handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User>> {
        try {
            // Validar se o corpo da requisição existe e se ele não é vazio
            if (!httpRequest.body || verifyEmptyObject(httpRequest.body)) {
                return {
                    statusCode: 400,
                    body: 'Please specify a body'
                }
            }

            const requiredFields = ["firstName", "lastName", "email", "password"]
            // Verificando campos requeridos
            for (const field of requiredFields) {
                if (!httpRequest.body[field as keyof ICreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Field '${field}' is required`
                    }
                }
            }

            // Verificar se o email é válido
            const emailIsValid = validator.isEmail(httpRequest.body.email)
            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: 'E-mail is invalid'
                }
            }

            const user = await this.createUserRepository.createUser(httpRequest.body)

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
