"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Plugin {
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
    router(uploader, db) {
        return express_1.Router();
    }
}
exports.default = Plugin;
