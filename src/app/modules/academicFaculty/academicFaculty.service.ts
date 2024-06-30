import { NextFunction } from "express";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import httpStatus from "http-status";

async function createAcademicFacultyIntoDb(payload: TAcademicFaculty, next: NextFunction) {

    try {
        const result = await AcademicFaculty.create(payload);

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Academic Faculty Created Successfully', data: result, error: null }
        };

    } catch (error) {
        next(error);
    };

}; //end

export const AcademicFacultyServices = { createAcademicFacultyIntoDb };