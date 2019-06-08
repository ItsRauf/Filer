"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function deleteImage(req, res, next) {
    const exts = ["png", "jpg", "jpeg", "gif", "webm"];
    const mimeArr = req.file.mimetype.split("/");
    const ext = mimeArr[mimeArr.length - 1];
    if (!exts.includes(ext)) {
        fs_1.unlink(`${req.filer.destination}/${req.file.filename}`, (err) => {
            if (err) {
                next(err);
            }
        });
        next(new Error("Invalid File Type"));
    }
    next();
}
exports.deleteImage = deleteImage;
function matchPassword(req, res, next) {
    if (req.headers.authorization === req.filer.password) {
        next();
    }
    else {
        next(new Error("Invalid Password"));
    }
}
exports.matchPassword = matchPassword;
