import { EventEmitter } from "events";
import FileSync from "lowdb/adapters/FileSync";
import Plugin from "./plugins/Plugin";

import cors from "cors";
import crypto from "crypto";
import express from "express";
import lowdb from "lowdb";
import multer from "multer";

interface IFilerOptions {
  destination: string;
  password?: string;
  port?: number | 4200;
}

class Filer extends EventEmitter {
  public plugins: Plugin[] | undefined;
  public options: IFilerOptions;
  private storage: multer.StorageEngine;
  private express: express.Express;
  private multer: multer.Instance;
  private db: lowdb.LowdbSync<lowdb.AdapterSync<any>>;

  constructor(options: IFilerOptions, plugins?: Plugin[]) {
    super();
    this.plugins = plugins;
    this.options = options;
    this.options.port = this.options.port || 4200;
    this.options.password = this.options.password || crypto.randomBytes(10).toString("hex");
    this.express = express();
    this.express.use((req, res, next) => {
      req.filer = {
        destination: this.options.destination,
        password: this.options.password
      };
      next();
    });
    this.storage = multer.diskStorage({
      destination: (req, file, next) => {
        next(null, this.options.destination);
      },
      filename: (req, file, next) => {
        const mimeArr: string[] = file.mimetype.split("/");
        const ext: string = mimeArr[mimeArr.length - 1];
        const fileName: string = crypto.randomBytes(3).toString("hex");
        next(null, `${fileName}.${ext}`);
      }
    });
    this.multer = multer({ storage: this.storage });
    this.db = lowdb(new FileSync("db.json"));
  }

  public init(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    console.log(`Password is: ${this.options.password}`);

    if (this.plugins) {
      this.plugins.map((plugin) => {
        this.express.use(
          `/${plugin.name}`,
          plugin.router(this.multer, this.db)
        );
      });
    }

    this.express.listen(this.options.port, () => {
      this.emit("ready");
    });
  }
}

export default Filer;
