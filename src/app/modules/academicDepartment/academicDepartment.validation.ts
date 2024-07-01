import { z } from "zod";

const createAcademicDepartmentSchemaValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be an String'
        }),
    }),
});

const updateAcademicDepartmentSchemaValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be an String'
        }).optional(),
    }),
});

export const AcademicDepartmentValidation = {  createAcademicDepartmentSchemaValidation, updateAcademicDepartmentSchemaValidation }
//