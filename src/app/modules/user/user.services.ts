import config from "../../config";
import { TAcademicSemester } from "../academicSemester/semester.interface";
import { AcademicSemester } from "../academicSemester/semester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
// import studentValidationSchema from "../student/student.validation";
// import { UserValidation } from "./user.validation";

async function createStudentIntoDb(password: string, payload: TStudent) {

    // create a user Object
    const user: NewUser = { password: null, role: 'student', id: null };

    // if password is not given, use default password. default pass is securely stored in .env file.
    user.password = password || (config.default_pass as string);

    // find full academic semester info for generating id;
    const academicSemesterInfo = await AcademicSemester.findById(payload.admissionSemester);
    
    // set user id
    user.id = await generateStudentId(academicSemesterInfo as TAcademicSemester);

    // ****
    // isolated environment for transaction and rollback;
    const session = await mongoose.startSession();

    try {

        // ****
        session.startTransaction();

        // create a user (transaction 1)
        const newUser = await User.create([user], { session });

        //   if user creation failure we will throw new error
        if (!newUser.length) {
            throw new Error('User creation failed!');
        };

        // if user is successfully created we well modify student data.
        payload.id = newUser[0].id
        payload.user = newUser[0]._id

        // create a student (transition 2);
        const newStudent = await Student.create([payload], { session });

        if (!newStudent.length) {
            throw new Error('Student creation failed!');
        };

        await session.commitTransaction();
        await session.endSession();

        return { status: httpStatus.OK, success: true, message: 'Student Created Successfully', data: newStudent, error: null }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        return { status: httpStatus.BAD_REQUEST, success: false, message: 'Student Creation Failed', data: null, error: error };
    }

}; //end

export const UserServices = { createStudentIntoDb }

