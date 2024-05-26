import { NextFunction } from "express";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser } from "./user.interface";
import User from "./user.model";

async function createStudentIntoDb(password: string, student: TStudent, next: NextFunction) {

    // create a user Object
    const user: NewUser = { password: null, role: 'student', id: null };

    // if password is not given, use default password. default pass is securely stored in .env file.
    user.password = password || (config.default_pass as string);

    // TODO
    // set hardcoded id but it well be generated automatically.
    user.id = `323232zzz3aa`;

    try {

        // create a user
        const newUser = await User.create(user);

        // if user is successfully created we well modify student data.
        if (Object.keys(newUser).length) {
            student.id = newUser.id;
            student.user = newUser._id;

            // const zodParsedStudent = studentValidationSchema.parse(student);
            const newStudent = await Student.create(student);

            return { status: 200, success: true, message: 'Student Created Successfully', data: newStudent, error: null }
        };

    } catch (error) {
        next(error);
    }

};

export const UserServices = { createStudentIntoDb }

