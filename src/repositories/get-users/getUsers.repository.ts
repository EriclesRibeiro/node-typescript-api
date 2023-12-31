import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import MongoClient from "../../database/mongo";
import User from "../../models/user.model";
import { MongoUser } from "../protocols";

class GetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {

        const users = await MongoClient.db.collection<MongoUser>('users').find({}).toArray()
        return users.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }))
    }

}

export default GetUsersRepository