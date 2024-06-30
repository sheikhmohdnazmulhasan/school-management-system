import httpStatus from "http-status";
import { TAcademicSemester } from "./semester.interface";
import { AcademicSemester } from "./semester.model";

async function createAcademicSemesterIntoDb(payload: TAcademicSemester) {

    try {
        
        const createNewAcademicSemester = await AcademicSemester.create(payload);

        return { status: httpStatus.OK, success: true, message: 'Academic Semester Created Successfully', data: createNewAcademicSemester, error: null };

    } catch (error) {
        return { status: httpStatus.BAD_REQUEST, success: false, message: 'Academic Semester Creation Failed', data: null, error: error }
    };
};

export const AcademicSemesterServices = { createAcademicSemesterIntoDb };