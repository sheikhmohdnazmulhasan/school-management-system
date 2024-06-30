import { NextFunction, Request, Response } from "express";
import { AcademicSemesterServices } from "./semester.service";

// create a new academic semester;
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

}; //end

// get all academic semesters;
async function getAllAcademicSemesters(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicSemesterServices.getAllAcademicSemestersFromDb(next);

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
        next(error);
    };

}; // end

// get specific academic semester;
async function getSpecificSemester(req: Request, res: Response, next: NextFunction) {


    try {
        const result = await AcademicSemesterServices.getSpecificSemesterFromDb(req.params.semesterId, next);

        if (result) {
            res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data,
                error: result.error
            });
        };

    } catch (error) {
        next(error)
    }

};

// update specific academic semester;
async function updateSpecificSemester(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicSemesterServices.updateSpecificSemesterIntoDb(req.params.semesterId, req.body, next);

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

export const AcademicSemesterControllers = { createAcademicSemester, getAllAcademicSemesters, getSpecificSemester, updateSpecificSemester };
