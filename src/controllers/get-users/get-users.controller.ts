import User from "../../models/user.model";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

class GetUsersController implements IController {

    /**
     * Simplificando a atribuição de propriedade do 
     * getUsersRepository com o 'private readonly'
     */
    constructor(private readonly getUsersRepository: IGetUsersRepository) { }
    async handle(): Promise<HttpResponse<User[] | string>> {
        try {
            const users = await this.getUsersRepository.getUsers()

            return ok<User[]>(users)
        } catch (error) {
            return serverError()
        }
    }
}

export default GetUsersController