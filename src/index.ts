import express from 'express'
import { router } from './routes/tasks'
import 'dotenv/config'

import { connectDb } from './db/connect'
import { notFound } from '../src/middleware/not_found'

const app = express()
const port = process.env.PORT
const dbUrl = process.env.MONGODB_URL
const baseUrl = '/api/v1/tasks'

//middleware
app.use(express.json())

//routes
app.use(baseUrl, router)
app.use(notFound)

const start = async () => {
  try {
    await connectDb(dbUrl)
    app.listen(port, () => console.log(`Server running on port  ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
