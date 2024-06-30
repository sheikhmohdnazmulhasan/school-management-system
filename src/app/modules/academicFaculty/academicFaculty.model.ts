import mongoose, { Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true, unique: true },

}, { timestamps: true });

// academicFacultySchema.pre('save', async function (next) {
//     const name = this.name;
//     const isAcademicFacultyExists = await AcademicFaculty.aggregate([{ $match: { name } }]);

//     if (isAcademicFacultyExists) {
//         throw new Error('Academic Faculty is Already Exist!')
//     };

// });

export const AcademicFaculty = mongoose.model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);