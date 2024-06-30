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

async function getAllAcademicFaculties(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb(next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        };

    } catch (error) {

    };

}; //end


async function getSpecificAcademicFaculty(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicFacultyServices.getSpecificAcademicFacultyFromDb(req.params.academicFacultyId, next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        };

    } catch (error) {

    }
};


export const AcademicFacultyControllers = { createAcademicFaculty, getAllAcademicFaculties, getSpecificAcademicFaculty }