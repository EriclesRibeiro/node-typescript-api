import { ICreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import MongoClient from "../../database/mongo";
import User from "../../models/user.model";
import { MongoUser } from "../protocols";

class CreateUserRepository implements ICreateUserRepository {
    async createUser(params: ICreateUserParams): Promise<User> {
        const { insertedId } = await MongoClient.db.collection('users').insertOne(params)
        const user = await MongoClient.db
            .collection<MongoUser>('users')
            .findOne({ _id: insertedId })

        if (!user) {
            throw new Error('User not created')
        }

        const { _id, ...rest } = user

        return { id: _id.toHexString(), ...rest }
    }

}

export default CreateUserRepository