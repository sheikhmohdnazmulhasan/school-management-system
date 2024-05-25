import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser } from "./user.interface";
import User from "./user.model";

async function createStudentIntoDb(password: string, student: TStudent) {

    // create a user Object
    const user: NewUser = { password: null, role: 'student', id: null };

    // if password is not given, use default password. default pass is securely stored in .env file.
    user.password = password || (config.default_pass as string);

    // TODO
    // set hardcoded id but it well be generated automatically.
    user.id = '20012000001';

    // create a user
    const newUser = await User.create(user);

    // if user is successfully created we well modify student data.
    if (Object.keys(student).length) {
        student.id = newUser.id;
        student.user = newUser._id;
        student.password = password || (config.default_pass as string);

        const newStudent = Student.create(student);
        return newStudent;
    };

};

export const UserServices = { createStudentIntoDb }

