import mongoose, { Schema } from "mongoose";
import { TAcademicSemester } from "./semester.interface";

const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'], required: true },
    code: { type: String, enum: ['01', '02', '03'], required: true },
    year: { type: Date, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true }
});

export const AcademicSemester = mongoose.model('AcademicSemester', academicSemesterSchema);