import { NextFunction } from "express";
import ErrorRequest from "./interfaces/error";

export default function forbidden (next: NextFunction) {
    const err: ErrorRequest = new Error("Forbidden");
    err.statusCode = 403;
    return next(err);
}
