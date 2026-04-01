import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler"

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(express.json(
    {
        limit: '16kb'
    }
))

app.use(express.urlencoded(
    {
        extended: true,
        limit: '16kb'
    }
))

app.use(express.static('public'))

app.use(cookieParser())

//user routes declaration
import userRouter from './routes/user.routes'

app.use('/api/v1/users', userRouter)
// Example: http://localhost:8000/api/v1/users/signup

import restaurantRouter from './routes/restaurant.routes'
app.use("/api/v1/restaurant", restaurantRouter);

// global error handler (must be last)
app.use(errorHandler);

export { app }