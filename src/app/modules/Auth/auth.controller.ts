import { NextFunction, Request, Response } from "express";
import { LoginUserServices } from "./auth.service";

async function loginUser(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await LoginUserServices.loginUser(req.body, next);

        if (result) {

            res.cookie('refreshToken', result?.refreshToken, {
                secure: false,
                httpOnly: true,
            });


            res.status(result.status).json({
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                needsPasswordChanges: result.needsPasswordChange
            });
        };


    } catch (error) {
        next(error)
    }
};

async function refreshToken(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await LoginUserServices.refreshToken(req.cookies.refreshToken, next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                data: result.data,

            });
        }

    } catch (error) {
        next(error);
    }
}

export const LoginUserControllers = { loginUser, refreshToken };