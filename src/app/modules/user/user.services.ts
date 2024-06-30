import config from "../../config";
import { TAcademicSemester } from "../academicSemester/semester.interface";
import { AcademicSemester } from "../academicSemester/semester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import { generateStudentId } from "./user.utils";
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

    console.log(user);

    try {

        // create a user
        // const zodParsedUser = UserValidation.userSchemaValidation.parse(user);
        const newUser = await User.create(user);

        // if user is successfully created we well modify student data.
        if (Object.keys(newUser).length) {
            payload.id = newUser.id;
            payload.user = newUser._id;

            // const zodParsedStudent = studentValidationSchema.parse(student);
            const newStudent = await Student.create(payload);

            return { status: httpStatus.OK, success: true, message: 'Student Created Successfully', data: newStudent, error: null }
        };

    } catch (error) {
        return { status: httpStatus.BAD_REQUEST, success: false, message: 'Student Creation Failed', data: null, error: error }
    }

}; //end

export const UserServices = { createStudentIntoDb }

