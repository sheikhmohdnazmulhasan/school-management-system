import { NextFunction, Request, Response } from "express";
import { AcademicDepartmentServices } from "./academicDepartment.service";


async function createAcademicDepartment(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body, next);

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

async function getAllAcademicDepartments(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDb(next);

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


async function getSpecificAcademicDepartment(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicDepartmentServices.getSpecificAcademicDepartmentFromDb(req.params.academicDepartmentId, next);

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

async function updateSpecificAcademicDepartment(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await AcademicDepartmentServices.updateSpecificAcademicDepartmentFromDb(req.params.academicDepartmentId, req.body, next);

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


export const AcademicDepartmentControllers = { createAcademicDepartment, getAllAcademicDepartments, getSpecificAcademicDepartment, updateSpecificAcademicDepartment }