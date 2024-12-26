"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = void 0;
const crypto_1 = __importDefault(require("crypto"));
// export function generateEncryptedFileName(originalName: string): string {
//   const fileExtension = originalName.split('.').pop();
//   const randomHash = crypto.randomBytes(16).toString('hex');
//   return `${randomHash}.${fileExtension}`;
// }
const generateFileName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString('hex');
exports.generateFileName = generateFileName;
