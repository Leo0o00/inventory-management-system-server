"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = forbidden;
function forbidden(next) {
    const err = new Error("Forbidden");
    err.statusCode = 403;
    return next(err);
}
