import mongoose, { Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true },

}, { timestamps: true });

export const AcademicFaculty = mongoose.model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);