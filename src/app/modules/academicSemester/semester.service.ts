import httpStatus from "http-status";
import { TAcademicSemester } from "./semester.interface";
import { AcademicSemester } from "./semester.model";
import { NextFunction } from "express";

async function createAcademicSemesterIntoDb(payload: TAcademicSemester, next: NextFunction) {

    // checking semester name and code
    type TAcademicSemesterCodeChecker = { [key: string]: string };
    const academicSemesterCodeChecker: TAcademicSemesterCodeChecker = { Autumn: '01', Summer: '02', Fall: '03' };

    if (academicSemesterCodeChecker[payload.name] !== payload.code) {
        throw new Error('Wrong Academic Semester Code!');

    };

    try {

        const createNewAcademicSemester = await AcademicSemester.create(payload);

        return { status: httpStatus.OK, success: true, message: 'Academic Semester Created Successfully', data: createNewAcademicSemester, error: null };

    } catch (error) {
        next(error)
    };
};

export const AcademicSemesterServices = { createAcademicSemesterIntoDb };