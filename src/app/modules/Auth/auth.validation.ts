import { z } from "zod";

const userLoginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: 'id is required' }),
        password: z.string({ required_error: 'password is required' }),
    })
});

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'refresh token is required'
        })
    })
})

export const UserLoginValidation = { userLoginValidationSchema, refreshTokenValidationSchema };