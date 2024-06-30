import httpStatus from "http-status";
import { TAcademicSemester } from "./semester.interface";
import { AcademicSemester } from "./semester.model";
import { NextFunction } from "express";

// create a new academic semester;
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

}; //end

// find all academic semester;
async function getAllAcademicSemestersFromDb(next: NextFunction) {

    try {
        const result = await AcademicSemester.find();

        return { status: httpStatus.OK, success: true, message: 'All Semesters Fetched Successfully', data: result, error: null };

    } catch (error) {
        next(error)
    };

}; //end

// get specific academic semester;
async function getSpecificSemesterFromDb(semesterId: string, next: NextFunction) {

    try {
        const result = await AcademicSemester.findById(semesterId);

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Semester Fetched Successfully', data: result, error: null };

        };

    } catch (error) {
        next(error);
    };

}; //end

// update a academic semester info;
async function updateSpecificSemesterIntoDb(semesterId: string, payload: TAcademicSemester, next: NextFunction) {

    // checking semester name and code
    type TAcademicSemesterCodeChecker = { [key: string]: string };
    const academicSemesterCodeChecker: TAcademicSemesterCodeChecker = { Autumn: '01', Summer: '02', Fall: '03' };

    if (academicSemesterCodeChecker[payload.name] !== payload.code) {
        throw new Error('Wrong Academic Semester Code!');

    };

    try {

        const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload);

        if (result) {
            return { status: httpStatus.OK, success: true, message: 'Semester Updated Successfully', data: result, error: null };

        };

    } catch (error) {
        next(error)
    };

}; //end

export const AcademicSemesterServices = { createAcademicSemesterIntoDb, getAllAcademicSemestersFromDb, getSpecificSemesterFromDb, updateSpecificSemesterIntoDb };