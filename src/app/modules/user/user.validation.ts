import { z } from "zod";
// import { TUser } from "./user.interface";

const userSchemaValidation = z.object({
    
    password: z.string({
        invalid_type_error: 'Password must be string'
    }).max(20, { message: 'Password can not be more then 20 character' })

    // id: z.string({
    //     invalid_type_error: 'id must be string',
    // }),

    // needsPasswordChanges: z.boolean({
    //     invalid_type_error: 'needsPasswordChanges must be have true of false',
    // }),

    // role: z.enum(['in-progress', 'blocked']),

    // isDeleted: z.boolean({
    //     invalid_type_error: 'isDeleted must be have true of false',
    // }),

});

export const UserValidation = { userSchemaValidation };