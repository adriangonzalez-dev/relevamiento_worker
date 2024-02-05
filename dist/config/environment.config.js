"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
require("dotenv/config");
exports.environment = {
    DB_HOST: String(process.env.POSTGRES_HOST),
    DB_PORT: Number(process.env.POSTGRES_PORT),
    DB_USER: String(process.env.POSTGRES_USER),
    DB_PASSWORD: String(process.env.POSTGRES_PASSWORD),
    DB_NAME: String(process.env.POSTGRES_DB),
    PORT: Number(process.env.PORT) || 3000,
};
