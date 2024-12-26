const {
    PORT: port = "8000",
    NODE_ENV: enviroment = "development",

    BUCKET_NAME: bucket_name = "",
    BUCKET_REGION: bucket_region = "",
    ACCESS_KEY: access_key = "",
    SECRET_ACCESS_KEY: secret_access_key = ""
} = process.env;

export const EnvConfig = {
    port,
    enviroment,
    bucket_name,
    bucket_region,
    access_key,
    secret_access_key
};