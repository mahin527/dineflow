import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
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

// User routes declaration

app.get('/api/v1/ping', (_, res) => {
    res.send('Hello, this is dineflow server!')
})

import userRouter from './routes/user.routes.js'

app.use('/api/v1/user', userRouter)
// Example: http://localhost:8000/api/v1/users/signup
// => https://dineflow-server.onrender.com/api/v1/users/signup

// Restaurant routes declaration
import restaurantRouter from './routes/restaurant.routes.js'
app.use("/api/v1/restaurant", restaurantRouter);

// Menu routes declaration
import menuRouter from './routes/menu.routes.js'
app.use("/api/v1/menu", menuRouter);

// Order routes declaration
import orderRouter from './routes/order.routes.js'
app.use("/api/v1/orders", orderRouter);

// global error handler (must be last)
app.use(errorHandler);

export { app }