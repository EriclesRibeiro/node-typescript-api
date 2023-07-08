import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import GetUsersController from './controllers/get-users/get-users.controller'
import GetUsersRepository from './repositories/get-users/getUsers.repository'
import MongoClient from './database/mongo'
import { log } from 'console'
import CreateUserRepository from './repositories/create-user/create-user.repository'
import CreateUserController from './controllers/create-user/create-user.controller'
import UpdateUserRepository from './repositories/update-user/update-user.repository'
import UpdateUserController from './controllers/update-user/update-user.controller'
import DeleteUserRepository from './repositories/delete-user/delete-user.repository'
import DeleteUserController from './controllers/delete-user/delete-user.controller'

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

        res.status(statusCode).send(body)
    })

    app.post("/users", async (req: Request, res: Response) => {
        const createUserRepository = new CreateUserRepository()
        const createUserController = new CreateUserController(createUserRepository)

        const response = await createUserController.handle({ body: req.body })
        const { body, statusCode } = response

        res.status(statusCode).send(body)
    })

    app.patch("/users/:id", async (req: Request, res: Response) => {
        const updateUserRepository = new UpdateUserRepository()
        const updateUserController = new UpdateUserController(updateUserRepository)

        const response = await updateUserController.handle({ body: req.body, params: req.params })
        const { body, statusCode } = response

        res.status(statusCode).send(body)
    })

    app.delete("/users/:id", async (req: Request, res: Response) => {
        const deleteUserRepository = new DeleteUserRepository()
        const deleteUserController = new DeleteUserController(deleteUserRepository)

        const response = await deleteUserController.handle({
            params: req.params
        })
        const { body, statusCode } = response

        res.status(statusCode).send(body)
    })

    app.listen(PORT, () => log(`.:listening on port ${PORT}:.`))
}

main()