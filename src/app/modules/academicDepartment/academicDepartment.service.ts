import { NextFunction } from "express";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import httpStatus from "http-status";

async function createAcademicDepartmentIntoDb(payload: TAcademicDepartment, next: NextFunction) {

    try {
        const result = await AcademicDepartment.create(payload);

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Academic Department Created Successfully', data: result, error: null }
        };

    } catch (error) {
        next(error);
    };

}; //end

async function getAllAcademicDepartmentFromDb(next: NextFunction) {

    try {
        const result = await AcademicDepartment.find();

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Academic Department Fetched Successfully', data: result, error: null }
        };

    } catch (error) {
        next(error)
    };

}; //end

async function getSpecificAcademicDepartmentFromDb(academicDepartmentId: string, next: NextFunction) {

    try {
        const result = await AcademicDepartment.findById(academicDepartmentId).populate('academicFaculty')

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Academic Department Fetched Successfully', data: result, error: null }
        };

    } catch (error) {
        next(error);
    };

}; //end

async function updateSpecificAcademicDepartmentFromDb(academicDepartmentId: string, payload: Partial<TAcademicDepartment>, next: NextFunction) {

    try {
        const result = await AcademicDepartment.findByIdAndUpdate(academicDepartmentId, payload);

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Academic Department update Successfully', data: result, error: null }
        };

    } catch (error) {
        next(error);
    };

}; //end

export const AcademicDepartmentServices = { createAcademicDepartmentIntoDb, getAllAcademicDepartmentFromDb, getSpecificAcademicDepartmentFromDb, updateSpecificAcademicDepartmentFromDb };