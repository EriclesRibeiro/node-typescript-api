import User from "../../models/user.model"

interface ICreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface ICreateUserRepository {
    createUser(params: ICreateUserParams): Promise<User>
}

export {
    ICreateUserParams,
    ICreateUserRepository
}