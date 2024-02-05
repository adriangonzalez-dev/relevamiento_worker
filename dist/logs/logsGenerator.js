"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
const logGenerator = (message) => {
    const newLine = `[${new Date()}] - ${message}`;
    console.log(newLine);
    fs_1.default.appendFile('log.txt', newLine, (err) => {
        if (err)
            throw err;
    });
};
exports.logGenerator = logGenerator;
