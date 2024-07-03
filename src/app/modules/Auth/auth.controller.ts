import { NextFunction, Request, Response } from "express";
import { LoginUserServices } from "./auth.service";

async function loginUser(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await LoginUserServices.loginUser(req.body, next);

        if (result) {
            res.status(result.status).json({
                accessToken: result.accessToken,
                needsPasswordChanges: result.needsPasswordChange
            });
        };


    } catch (error) {
        next(error)
    }
}

export const LoginUserControllers = { loginUser };