import 'dotenv/config'; // It is better to put it above all else.
import { app } from "./app";
import connectDB from "./db/connectDB";

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        // `app.listen()` returns a server object.
        const server = app.listen(port, () => {
            console.log(`⚙️  Server is running at port: ${port}`);
        });

        // Now handle errors on the server object.
        server.on('error', (error: any) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${port} is already in use.`);
            } else {
                console.error('Express Server Error::', error);
            }
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err);
        process.exit(1); // It is better to stop the process if the connection fails.
    });