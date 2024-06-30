import { z } from "zod";

const createAcademicFacultySchemaValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be an String'
        }),
    }),
});

const updateAcademicFacultySchemaValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be an String'
        }).optional(),
    }),
});

export const AcademicFacultyValidation = { createAcademicFacultySchemaValidation, updateAcademicFacultySchemaValidation }
//