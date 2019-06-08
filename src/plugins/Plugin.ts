import { Router } from "express";

import lowdb from "lowdb";
import multer from "multer";

export default class Plugin {
  public name: string;
  public options: object | undefined;

  constructor(name: string, options?: object) {
    this.name = name;
    this.options = options;
  }

  public router(
    uploader: multer.Instance,
    db: lowdb.LowdbSync<lowdb.AdapterSync>
  ) {
    return Router();
  }
}

export interface IRouteError {
  message: string;
  timestamp: Date;
  route: string;
}

export interface IPluginList {
  [name: string]: Plugin;
  Images: Plugin;
  Files: Plugin;
  Links: Plugin;
}
