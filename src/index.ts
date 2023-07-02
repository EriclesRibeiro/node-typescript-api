import express from 'express'
import { config } from 'dotenv'

const app = express()

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))