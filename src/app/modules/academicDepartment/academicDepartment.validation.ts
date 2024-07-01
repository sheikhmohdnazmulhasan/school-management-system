import { z } from "zod";

const createAcademicDepartmentSchemaValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be an String'
        }),
        academicFaculty: z.string()
    }),
});

const updateAcademicDepartmentSchemaValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be an String'
        }).optional(),
        academicFaculty: z.string().optional()
    }),
});

export const AcademicDepartmentValidation = { createAcademicDepartmentSchemaValidation, updateAcademicDepartmentSchemaValidation }
//