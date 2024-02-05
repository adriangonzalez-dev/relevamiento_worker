"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const environment_config_1 = require("./environment.config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: environment_config_1.environment['DB_HOST'],
    port: environment_config_1.environment['DB_PORT'],
    username: environment_config_1.environment['DB_USER'],
    password: environment_config_1.environment['DB_PASSWORD'],
    database: environment_config_1.environment['DB_NAME'],
    synchronize: true,
    logging: false,
    entities: ["dist/src/entity/*.js"],
    subscribers: [],
    migrations: [],
});
