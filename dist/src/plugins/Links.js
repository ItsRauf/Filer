"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("../utils");
const Plugin_1 = __importDefault(require("./Plugin"));
class LinkPlugin extends Plugin_1.default {
    constructor(options) {
        super("links", options);
        this.options = options;
    }
    router(uploader, db) {
        const router = express_1.Router();
        router.post("/shorten", utils_1.matchPassword, (req, res, next) => {
            try {
                const shorten = crypto_1.default.randomBytes(3).toString("hex");
                db.set(shorten, req.body.url).write();
                res.send(shorten);
            }
            catch (err) {
                const error = {
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
            }
            catch (err) {
                const error = {
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
exports.default = LinkPlugin;
