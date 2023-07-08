import User from "../../models/user.model"

interface IUpdateUserParams {
    firstName?: string;
    lastName?: string;
    password?: string;
}

interface IUpdateUserRepository {
    updateUser(id: string, params: IUpdateUserParams): Promise<User>
}

export {
    IUpdateUserRepository,
    IUpdateUserParams
}