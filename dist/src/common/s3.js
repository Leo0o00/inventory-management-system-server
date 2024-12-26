"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_config_1 = require("../config/env.config");
const bucketName = env_config_1.EnvConfig.bucket_name;
const bucketRegion = env_config_1.EnvConfig.bucket_region;
const accessKey = env_config_1.EnvConfig.access_key;
const secretAccess_key = env_config_1.EnvConfig.secret_access_key;
const s3Client = new client_s3_1.S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccess_key,
    }
});
function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    };
    return s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
}
function deleteFile(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };
    return s3Client.send(new client_s3_1.DeleteObjectCommand(deleteParams));
}
/* export async function getObjectSignedUrl(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
} */
