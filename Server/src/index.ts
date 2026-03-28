import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connectDB"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    connectDb()
    console.log(`⚙️  Server is running at http://localhost:${PORT}/`);

})

