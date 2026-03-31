import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Making sure the folder exists, creating it if not
const uploadDir = './public/temp';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (_, file, cb) {
        // It is better to make the file name unique so that files with the same name are not replaced
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit (optional)
});