import { IGetUsersController, IGetUsersRepository } from "./protocols";

class GetUsersController implements IGetUsersController {

    /**
     * Simplificando a atribuição de propriedade do 
     * getUsersRepository com o 'private readonly'
     */
    constructor(private readonly getUsersRepository: IGetUsersRepository) { }

    async handler() {
        try {
            const users = await this.getUsersRepository.getUsers()
            return {
                statusCode: 200,
                body: users
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong"
            }
        }
    }
}

export default GetUsersController