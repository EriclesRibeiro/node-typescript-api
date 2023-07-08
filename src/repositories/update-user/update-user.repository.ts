import { ObjectId } from "mongodb";
import { IUpdateUserParams, IUpdateUserRepository } from "../../controllers/update-user/protocols";
import MongoClient from "../../database/mongo";
import User from "../../models/user.model";
import { MongoUser } from "../protocols";

class UpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: IUpdateUserParams): Promise<User> {
        await MongoClient.db.collection('users').updateOne({ _id: new ObjectId(id) }, {
            $set: {
                ...params
            }
        })

        const user = await MongoClient.db.collection<MongoUser>('users').findOne({ _id: new ObjectId(id) })

        if (!user) {
            throw new Error('User not updated')
        }

        const { _id, ...rest } = user

        return { id: _id.toHexString(), ...rest }
    }
}

export default UpdateUserRepository