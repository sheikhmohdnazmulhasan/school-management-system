import mongoose, { Schema } from "mongoose";
import { TAcademicSemester } from "./semester.interface";

const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'], required: true },
    code: { type: String, enum: ['01', '02', '03'], required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true }
}, { timestamps: true });



// pre hook middleware
academicSemesterSchema.pre('save', async function name(next) {

    const isAcademicSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    });

    if (isAcademicSemesterExists) {
        throw new Error('Academic Semester is Already Exist!');

    } else {
        next();
    };
});

export const AcademicSemester = mongoose.model('AcademicSemester', academicSemesterSchema);