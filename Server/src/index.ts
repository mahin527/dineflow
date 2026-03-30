import express from "express"
import 'dotenv/config'
import connectDB from "./db/connectDB"


const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    connectDB()
    console.log(`⚙️  Server is running at http://localhost:${PORT}/`);

})

