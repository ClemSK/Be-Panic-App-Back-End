import express from 'express'
import router from './config/router.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './db/helpers.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

const startServer = async () => {
  try {
    await connectDb()
    console.log('Successfully connected to Database')
    app.listen(process.env.PORT, () => {
      console.log('API connected')
    })
  } catch (err) {
    console.log('Something went wrong connecting to server: ' + err)
  }
}

startServer()
