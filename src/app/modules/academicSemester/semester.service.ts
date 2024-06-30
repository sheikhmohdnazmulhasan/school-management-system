import httpStatus from "http-status";
import { TAcademicSemester } from "./semester.interface";

async function createAcademicSemesterIntoDb(data: TAcademicSemester) {

    try {
        return { status: httpStatus.OK, success: true, message: 'Student Created Successfully', data: data, error: null };

    } catch (error) {
        return { status: httpStatus.BAD_REQUEST, success: false, message: 'Student Creation Failed', data: null, error: error }
    };
};

export const AcademicSemesterServices = { createAcademicSemesterIntoDb };