import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"

const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // if custom ApiError 
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(
            {
                success: err.success,
                statusCode: err.statusCode,
                message: err.message,
                errors: err.errors,
                stack: process.env.NODE_ENV === "development" ? err.stack : undefined
            }
        )
    }

    // fallback for unexpected errors
    const genericError = err as Error;
    return res.status(500).json(
        {
            success: false,
            statusCode: 500,
            message: genericError.message || "Internel Server Error!",
            errors: [genericError.message],
            stack: process.env.NODE_ENV === "development" ? genericError.stack : undefined
        }
    )

}

export { errorHandler }

/* 
## Usage in Express app

```js
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { registerUser } from './controllers/user.controller';

const app = express();
app.use(express.json());

app.post('/register', registerUser);

// global error handler (must be last)
app.use(errorHandler);

app.listen(3000, () => console.log("Server running on port 3000"));

```
*/