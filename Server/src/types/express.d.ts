import { IUserDocument } from "../models/user.model.ts";

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument; // optional user object
            file?: Express.Multer.File; // optional file
            files?: Express.Multer.File[]; // optional multiple files
        }
    }
}
