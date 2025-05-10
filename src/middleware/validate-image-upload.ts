import multer from 'multer';
import path from 'path';
import { BadRequest } from '../error/bad-request-error';
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
      },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          cb(new BadRequest("Image format is not supported, only jpg, jpeg and png are allowed"));
          return;
        }
        cb(null, true);
      },
});

const validateImageUpload = (req: Request, res: Response, next: NextFunction) => {
    upload.single("image")(req, res, (err : Error | any) => {
        if (err) {
            res.status(err?.code ?? 400).json({ message: err?.message ?? "The image is required in form-data with the name 'image'." });
            return;
        }
        next();
    });
}

export { validateImageUpload }
