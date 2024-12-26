"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = void 0;
const { PORT: port = "8000", NODE_ENV: enviroment = "development", BUCKET_NAME: bucket_name = "", BUCKET_REGION: bucket_region = "", ACCESS_KEY: access_key = "", SECRET_ACCESS_KEY: secret_access_key = "" } = process.env;
exports.EnvConfig = {
    port,
    enviroment,
    bucket_name,
    bucket_region,
    access_key,
    secret_access_key
};
