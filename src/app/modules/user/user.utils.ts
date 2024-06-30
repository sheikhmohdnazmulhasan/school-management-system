import { TAcademicSemester } from "../academicSemester/semester.interface";
import User from "./user.model";

async function findLastStudentId() {
    const lastStudentId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();

    return lastStudentId ? lastStudentId.id.substring(6) : undefined;
};

export async function generateStudentId(payload: TAcademicSemester) {

    const currentId = await findLastStudentId() || (0).toString();
   
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    console.log(currentId);
    return incrementId;

};