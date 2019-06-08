import { Router } from "express";
import fs from "fs";
import lowdb from "lowdb";
import multer from "multer";
import path from "path";
import { matchPassword } from "../utils";
import Plugin, { IRouteError } from "./Plugin";

export default class ImagePlugin extends Plugin {
  constructor(options?: object) {
    super("files", options);

    this.options = options;
  }
  public router(
    uploader: multer.Instance,
    db: lowdb.LowdbSync<lowdb.AdapterSync>
  ): Router {
    const router: Router = Router();

    router.post("/upload", matchPassword, uploader.single("file"), (req, res, next) => {
      try {
        db.set(req.file.filename, req.file).write();
        res.send(req.file.filename);
      } catch (err) {
        const error: IRouteError = {
          message: err.message,
          route: "images/upload",
          timestamp: new Date()
        };
        console.error(error);
      }
    });

    router.get("/:id", (req, res, next) => {
      try {
        const image = db.get(req.params.id).value();
        res.setHeader("Content-Type", image.mimetype);
        fs.createReadStream(
          path.join(req.filer.destination, image.filename)
        ).pipe(res);
      } catch (err) {
        const error: IRouteError = {
          message: err.message,
          route: "images/upload",
          timestamp: new Date()
        };
        console.error(error);
      }
    });

    return router;
  }
}
