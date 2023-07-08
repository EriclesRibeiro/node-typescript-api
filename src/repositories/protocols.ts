import User from "../models/user.model";

type MongoUser = Omit<User, "id">

export {
    MongoUser
}