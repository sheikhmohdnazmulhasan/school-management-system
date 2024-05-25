import { z } from "zod";
// import { TUser } from "./user.interface";

const userSchemaValidation = z.object({
    id: z.string(),
    password: z.string().max(20, { message: 'Password can not be more then 20 character' }),
    needsPasswordChanges: z.boolean().optional().default(true),
    role: z.enum(['admin', 'faculty', 'student']),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: z.boolean().optional().default(false)

});

export const UserValidation = { userSchemaValidation };