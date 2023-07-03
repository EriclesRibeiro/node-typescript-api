import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import GetUsersController from './controllers/get-users/getUsers'
import GetUsersRepository from './repositories/get-users/getUsers.repository'

const app = express()

const PORT = process.env.PORT || 8000

app.get("/users", async (req: Request, res: Response) => {
    const getUsersRepository = new GetUsersRepository()
    const getUsersController = new GetUsersController(getUsersRepository)

    const response = await getUsersController.handler()

    res.send(response.body).status(response.statusCode)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))