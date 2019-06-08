import { NextFunction, Request, Response } from "express";
import { unlink as remove } from "fs";

export function deleteImage(req: Request, res: Response, next: NextFunction) {
  const exts = ["png", "jpg", "jpeg", "gif", "webm"];

  const mimeArr: string[] = req.file.mimetype.split("/");
  const ext: string = mimeArr[mimeArr.length - 1];

  if (!exts.includes(ext)) {
    remove(`${req.filer.destination}/${req.file.filename}`, (err) => {
      if (err) {
        next(err);
      }
    });
    next(new Error("Invalid File Type"));
  }
  next();
}

export function matchPassword(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization === req.filer.password) {
    next();
  } else {
    next(new Error("Invalid Password"));
  }
}
