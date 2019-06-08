export as namespace Filer;

import { EventEmitter } from "events";
import { Express } from "express";
import { Instance as MulterInstance } from "multer";

interface FilerError {
  message: string;
  timestamp: Date;
}

interface PluginList {
  [name: string]: Plugin;
  Images: Plugin;
  Files: Plugin;
  Links: Plugin;
}

export class Plugin {
  public options: object | undefined;
  public constructor(options?: object);
}
export const Plugins: PluginList;

interface IFilerOptions {
  destination: string;
  port: number | 4200;
}

interface Image {
  name: string;
  url: string;
}

export class Filer extends EventEmitter {
  public constructor(options: IFilerOptions, plugins?: Plugin[]);
  public plugins: Plugin[] | undefined;
  public options: IFilerOptions;
  private express: Express;
  private multer: MulterInstance;
  public on(
    event: "upload",
    listener: (err: FilerError, image: Image) => void
  ): this;
  public on(event: "ready", listener: () => void): this;
  public on(event: "error", listener: (err: FilerError) => void): this;
  public init(): void;
}
