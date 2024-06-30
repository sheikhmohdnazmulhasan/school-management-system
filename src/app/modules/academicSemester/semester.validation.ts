import { z } from "zod";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

const createAcademicSemesterSchema = z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']),
    code: z.enum(['01', '02', '03']),
    year: z.number().int().min(1900).max(new Date().getFullYear()), // Assuming year should be between 1900 and the current year
    startMonth: z.enum(months),
    endMonth: z.enum(months)
});

export const AcademicSemesterValidation = { createAcademicSemesterSchema }
