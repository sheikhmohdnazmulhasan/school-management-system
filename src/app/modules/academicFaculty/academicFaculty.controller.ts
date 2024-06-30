import { NextFunction, Request, Response } from "express";
import { AcademicFacultyServices } from "./academicFaculty.service";

async function createAcademicFaculty(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body, next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        };

    } catch (error) {
        next(error);
    };
    
}; //end

export const AcademicFacultyControllers = { createAcademicFaculty }