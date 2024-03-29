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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
class AxiosAdapter {
    constructor() {
        this.axios = axios_1.default;
    }
    getInvgate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(`${process.env.USER_INVGATE}:${process.env.PASSWORD_INVGATE}`)}`,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error('Error fetching data');
            }
        });
    }
}
exports.AxiosAdapter = AxiosAdapter;
