import { Request, Response } from "express";
import { AcademicSemesterServices } from "./semester.service";
import httpStatus from "http-status";

async function createAcademicSemester(req: Request, res: Response) {
    const data = req.body;

    try {
        const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(data);

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

export const AcademicSemesterControllers = { createAcademicSemester };
