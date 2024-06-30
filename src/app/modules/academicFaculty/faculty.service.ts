import { NextFunction } from "express";
import { TAcademicFaculty } from "./faculty.interface";
import { AcademicFaculty } from "./faculty.model";
import httpStatus from "http-status";

async function createAcademicFacultyIntoDb(payload: TAcademicFaculty, next: NextFunction) {

    try {
        const result = await AcademicFaculty.create(payload);

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Student Created Successfully', data: result, error: null }
        };

    } catch (error) {
        next(error);
    };

}; //end

export const AcademicFacultyServices = { createAcademicFacultyIntoDb };