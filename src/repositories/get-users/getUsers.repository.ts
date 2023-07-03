import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import User from "../../models/user.model";

class GetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [
            {
                email: 'fdec',
                firstName: 'cdccdc',
                lastName: 'cc',
                password: 'cdc'
            }
        ]
    }

}

export default GetUsersRepository