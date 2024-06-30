import { NextFunction, Request, Response } from "express";
import { AcademicSemesterServices } from "./semester.service";
import httpStatus from "http-status";

async function createAcademicSemester(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body, next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        };

    } catch (error) {
        // res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        //     success: false,
        //     message: 'internal server error'
        // });
        next(error)
    };
};

export const AcademicSemesterControllers = { createAcademicSemester };
