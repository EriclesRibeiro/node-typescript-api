import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import GetUsersController from './controllers/get-users/getUsers'
import GetUsersRepository from './repositories/get-users/getUsers.repository'
import MongoClient from './database/mongo'
import { log } from 'console'

const main = async () => {

    // Config do dotenv
    config()

    const app = express()

    const PORT = process.env.PORT || 8000

    await MongoClient.connect()

    // Primeira rota com repositorios para obter todos os usuarios
    app.get("/users", async (req: Request, res: Response) => {
        const getUsersRepository = new GetUsersRepository()
        const getUsersController = new GetUsersController(getUsersRepository)

        const response = await getUsersController.handler()

        res.send(response.body).status(response.statusCode)
    })

    app.listen(PORT, () => log(`.:listening on port ${PORT}:.`))
}

main()