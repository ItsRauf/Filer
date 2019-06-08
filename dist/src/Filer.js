"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = __importDefault(require("crypto"));
const express_1 = __importDefault(require("express"));
const lowdb_1 = __importDefault(require("lowdb"));
const multer_1 = __importDefault(require("multer"));
class Filer extends events_1.EventEmitter {
    constructor(options, plugins) {
        super();
        this.plugins = plugins;
        this.options = options;
        this.options.port = this.options.port || 4200;
        this.options.password = this.options.password || crypto_1.default.randomBytes(10).toString("hex");
        this.express = express_1.default();
        this.express.use((req, res, next) => {
            req.filer = {
                destination: this.options.destination,
                password: this.options.password
            };
            next();
        });
        this.storage = multer_1.default.diskStorage({
            destination: (req, file, next) => {
                next(null, this.options.destination);
            },
            filename: (req, file, next) => {
                const mimeArr = file.mimetype.split("/");
                const ext = mimeArr[mimeArr.length - 1];
                const fileName = crypto_1.default.randomBytes(3).toString("hex");
                next(null, `${fileName}.${ext}`);
            }
        });
        this.multer = multer_1.default({ storage: this.storage });
        this.db = lowdb_1.default(new FileSync_1.default("db.json"));
    }
    init() {
        this.express.use(cors_1.default());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        console.log(`Password is: ${this.options.password}`);
        if (this.plugins) {
            this.plugins.map((plugin) => {
                this.express.use(`/${plugin.name}`, plugin.router(this.multer, this.db));
            });
        }
        this.express.listen(this.options.port, () => {
            this.emit("ready");
        });
    }
}
exports.default = Filer;
