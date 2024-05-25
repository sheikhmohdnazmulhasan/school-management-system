import config from "../../config";
import { NewUser } from "./user.interface";
import User from "./user.model";

async function createStudentIntoDb(password: string, student: object) {

    // create a user Object
    const user: NewUser = { password: null, role: 'student', id: null };

    // if password is not given, use default password. default pass is securely stored in .env file.
    user.password = password || (config.default_pass as string);

    // TODO
    // set hardcoded id but it well be generated automatically.
    user.id = '20012000001';

    // if user is successfully created we well modify student data.
    if (Object.keys(student).length) {
        student.id = result.id;
        student.user = result._id;
    }

    const result = await User.create(user);
    if (result) return result;

};


