"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const Plugin_1 = __importDefault(require("./Plugin"));
class ImagePlugin extends Plugin_1.default {
    constructor(options) {
        super("images", options);
        this.options = options;
    }
    router(uploader, db) {
        const router = express_1.Router();
        router.post("/upload", utils_1.matchPassword, uploader.single("image"), utils_1.deleteImage, (req, res, next) => {
            try {
                db.set(req.file.filename, req.file).write();
                res.send(req.file.filename);
            }
            catch (err) {
                const error = {
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
                fs_1.default.createReadStream(path_1.default.join(req.filer.destination, image.filename)).pipe(res);
            }
            catch (err) {
                const error = {
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
exports.default = ImagePlugin;
