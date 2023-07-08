import User from "../../models/user.model";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { ICreateUserParams, ICreateUserRepository } from "./protocols";
import verifyEmptyObject from "../../utils/verify-empty-object";
import validator from "validator";
import { badRequest, created, serverError } from "../helpers";

class CreateUserController implements IController {

    constructor(private readonly createUserRepository: ICreateUserRepository) { }

    async handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            // Validar se o corpo da requisição existe e se ele não é vazio
            if (!httpRequest.body || verifyEmptyObject(httpRequest.body)) {
                return badRequest('Please specify a body')
            }

            const requiredFields = ["firstName", "lastName", "email", "password"]
            // Verificando campos requeridos
            for (const field of requiredFields) {
                if (!httpRequest.body[field as keyof ICreateUserParams]?.length) {
                    return badRequest(`Field '${field}' is required`)
                }
            }

            // Verificar se o email é válido
            const emailIsValid = validator.isEmail(httpRequest.body.email)
            if (!emailIsValid) {
                return badRequest('E-mail is invalid')
            }

            const user = await this.createUserRepository.createUser(httpRequest.body)

            return created<User>(user)

        } catch (error) {
            return serverError()
        }

    }
}

export default CreateUserController
