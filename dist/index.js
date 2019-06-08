"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Filer_1 = __importDefault(require("./src/Filer"));
const Files_1 = __importDefault(require("./src/plugins/Files"));
const Images_1 = __importDefault(require("./src/plugins/Images"));
const Links_1 = __importDefault(require("./src/plugins/Links"));
exports.Filer = Filer_1.default;
exports.Plugins = {
    Files: Files_1.default,
    Images: Images_1.default,
    Links: Links_1.default
};
