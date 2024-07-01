import mongoose, { Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' }

}, { timestamps: true });

// academicFacultySchema.pre('save', async function (next) {
//     const name = this.name;
//     const isAcademicFacultyExists = await AcademicFaculty.aggregate([{ $match: { name } }]);

//     if (isAcademicFacultyExists) {
//         throw new Error('Academic Faculty is Already Exist!')
//     };

// });

export const AcademicDepartment = mongoose.model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);