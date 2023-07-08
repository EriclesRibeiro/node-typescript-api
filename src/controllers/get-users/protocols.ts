import User from "../../models/user.model";

interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}

export {
    IGetUsersRepository
}