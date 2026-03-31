import { Multer } from "multer";
import { IUserDocument } from "../models/user.model"

declare global {
    namespace Express {
        interface Request {
            // Extend Express Request type to include `user`
            user?: IUserDocument;
            file?: Multer.File;
        }
    }
}