import User from "../../models/user.model";

interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>;
}

export {
    IDeleteUserRepository
}