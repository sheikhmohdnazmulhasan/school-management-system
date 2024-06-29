import { NextFunction, Request, Response } from "express";
import { UserServices } from "../user/user.services";
import httpStatus from "http-status";

async function createStudent(req: Request, res: Response) {
    const { password, student } = req.body;

    try {

        const result = await UserServices.createStudentIntoDb(password, student);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        };

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'internal server error'
        });
    };
};

export const userControllers = { createStudent };