import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import GetUsersController from './controllers/get-users/getUsers.controller'
import GetUsersRepository from './repositories/get-users/getUsers.repository'
import MongoClient from './database/mongo'
import { log } from 'console'
import CreateUserRepository from './repositories/create-user/createUser.repository'
import CreateUserController from './controllers/create-user/createUser.controller'

const main = async () => {

    // Config do dotenv
    config()

    const app = express()

    // Middleware do express para o trafego de dados
    app.use(express.json())

    const PORT = process.env.PORT || 8000

    await MongoClient.connect()

    // Primeira rota com repositorios para obter todos os usuarios
    app.get("/users", async (req: Request, res: Response) => {
        const getUsersRepository = new GetUsersRepository()
        const getUsersController = new GetUsersController(getUsersRepository)

        const response = await getUsersController.handler()
        const { body, statusCode } = response

        res.send(body).status(statusCode)
    })

    app.post("/users", async (req: Request, res: Response) => {
        const createUserRepository = new CreateUserRepository()
        const createUserController = new CreateUserController(createUserRepository)

        const response = await createUserController.handle({ body: req.body })
        const { body, statusCode } = response

        res.send(body).status(statusCode)
    })

    app.listen(PORT, () => log(`.:listening on port ${PORT}:.`))
}

main()