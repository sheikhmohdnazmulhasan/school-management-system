import mongoose, { Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' }

}, { timestamps: true });

// academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {

//     const query = this.getQuery();
//     const isDepartmentIdValid = AcademicDepartment.findOne({ query });

//     if (!isDepartmentIdValid) {
//         throw new Error('Academic Department id is not Valid!');

//     };

//     next();

// });


export const AcademicDepartment = mongoose.model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);