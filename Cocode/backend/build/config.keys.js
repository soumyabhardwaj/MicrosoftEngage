"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDOODLE_URL = exports.COOKIE_KEYS = exports.CLIENT_URL = exports.SERVER_URL = exports.port = exports.PROD = exports.JDOODLE = exports.DATABASE_URL = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.JDOODLE = {
    clientID: process.env.JDOODLE_CLIENTID,
    clientSecret: process.env.JDOOLDE_CLIENTSECRET,
};
exports.PROD = JSON.parse(process.env.PROD);
exports.port = parseInt(process.env.PORT) || 5000;
exports.SERVER_URL = process.env.SERVER_URL || "http://localhost:3001";
exports.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5000";
exports.COOKIE_KEYS = [process.env.COOKIE_KEYS];
exports.JDOODLE_URL = process.env.JDOODLE_URL;
