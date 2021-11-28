"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_keys_1 = require("../config.keys");
var knex_1 = __importDefault(require("knex"));
var client = (0, knex_1.default)({
    client: "pg",
    connection: {
        connectionString: config_keys_1.DATABASE_URL,
        ssl: config_keys_1.PROD,
    },
    searchPath: ["knex", "public"],
});
exports.default = client;
