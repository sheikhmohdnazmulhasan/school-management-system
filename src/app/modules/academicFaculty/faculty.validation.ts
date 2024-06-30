import { z } from "zod";

const academicFacultySchemaValidation = z.object({
    name: z.string({
        invalid_type_error: 'Name must be an String'
    }),

});

export const academicFacultyValidation = { academicFacultySchemaValidation }
//