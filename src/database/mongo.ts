import { MongoClient as Mongo, Db } from 'mongodb'
import mongoURI from "../utils/mongodb-uri"
import { log } from 'console'

const MongoClient = {
    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const URI = mongoURI()
        const client = new Mongo(URI as string)
        const db = client.db("express-api")

        this.client = client
        this.db = db

        log('.:connected to mongodb:.')
    }

}

export default MongoClient