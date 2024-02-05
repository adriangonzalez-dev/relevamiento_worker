"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_config_1 = require("./config/db.config");
const logsGenerator_1 = require("./logs/logsGenerator");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_config_1.AppDataSource.initialize();
        (0, logsGenerator_1.logGenerator)('Base de datos inicializada');
    }
    catch (error) {
        (0, logsGenerator_1.logGenerator)('Error al inicializar la base de datos');
        (0, logsGenerator_1.logGenerator)(error);
    }
}))();
