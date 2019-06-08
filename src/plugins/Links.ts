import { Router } from "express";

import crypto from "crypto";
import lowdb from "lowdb";
import multer from "multer";
import { matchPassword } from "../utils";
import Plugin, { IRouteError } from "./Plugin";

export default class LinkPlugin extends Plugin {
  constructor(options?: object) {
    super("links", options);

    this.options = options;
  }

  public router(
    uploader: multer.Instance,
    db: lowdb.LowdbSync<lowdb.AdapterSync>
  ): Router {
    const router: Router = Router();

    router.post("/shorten", matchPassword, (req, res, next) => {
      try {
        const shorten: string = crypto.randomBytes(3).toString("hex");
        db.set(shorten, req.body.url).write();
        res.send(shorten);
      } catch (err) {
        const error: IRouteError = {
          message: err.message,
          route: "links/shorten",
          timestamp: new Date()
        };
        console.error(error);
      }
    });

    router.get("/:id", (req, res, next) => {
      try {
        const link = db.get(req.params.id).value();
        res.redirect(link);
      } catch (err) {
        const error: IRouteError = {
          message: err.message,
          route: "links/:id",
          timestamp: new Date()
        };
        console.error(error);
      }
    });

    return router;
  }
}
