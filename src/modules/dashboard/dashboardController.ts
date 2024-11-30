import { NextFunction, Request, Response } from "express";
import { listMetrics } from "./dashboardService";

export async function getMetrics(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await listMetrics());
    } catch (err: any) {
        throw new Error(err)
    }
}