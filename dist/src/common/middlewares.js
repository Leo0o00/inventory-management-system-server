"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.handleErrors = handleErrors;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
function handleErrors(err, req, res, next) {
    const errStatus = err.statusCode || 500;
    //const errMsg = STATUS_CODES[errStatus] || err.message || 'Internal Error';
    const errMsg = err.message || 'Internal Error';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
}
