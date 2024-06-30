import { z } from "zod";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

const createAcademicSemesterSchema = z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summer', 'Fall']),
        code: z.enum(['01', '02', '03']),
        year: z.number().int().min(1900).max(new Date().getFullYear()),
        startMonth: z.enum(months),
        endMonth: z.enum(months)
    })
});

export const AcademicSemesterValidation = { createAcademicSemesterSchema }
