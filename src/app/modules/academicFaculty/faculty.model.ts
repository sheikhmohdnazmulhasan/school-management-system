import mongoose, { Schema } from "mongoose";
import { TAcademicFaculty } from "./faculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true },

});

export const AcademicFaculty = mongoose.model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);