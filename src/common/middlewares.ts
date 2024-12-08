//Multer middleware
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import ErrorRequest from "./interfaces/error";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export function handleErrors (err: ErrorRequest, req: Request, res: Response, next: NextFunction) {
    
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