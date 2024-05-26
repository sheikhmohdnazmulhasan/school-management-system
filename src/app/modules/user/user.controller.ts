import { NextFunction, Request, Response } from "express";
import { UserServices } from "../user/user.services";

async function createStudent(req: Request, res: Response, next: NextFunction) {
    const { password, student } = req.body;

    try {

        const result = await UserServices.createStudentIntoDb(password, student, next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        }

    } catch (error) {
        // res.status(400).json({
        //     success: false,
        //     message: 'internal server error'
        // })

        next(error)
    }

}

export const userControllers = { createStudent };
