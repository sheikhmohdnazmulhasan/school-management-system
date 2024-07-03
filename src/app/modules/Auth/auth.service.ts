import { NextFunction } from "express";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import User from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";


async function loginUser(payload: TLoginUser, next: NextFunction) {

    try {
        const user = await User.findOne({ id: payload.id });

        if (!user) {
            throw new Error('invalid Id');

        } else if (user?.isDeleted) {
            throw new Error('User Deleted');

        } else if (user.status === 'blocked') {
            throw new Error('user Blocked');

        } else {

            // finally check the password;
            const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);

            if (!isPasswordCorrect) {
                throw new Error('Wrong Password');


            } else {

                const userPayload = { id: user.id, role: user.role }

                // generate a token
                const accessToken = jwt.sign(userPayload,( config.jwt_access_secret as string), { expiresIn: '10d' });

                return { status: 200, accessToken, needsPasswordChange: user.needsPasswordChanges }

            }

        };

    } catch (error) {
        next(error)
    }

};


export const LoginUserServices = { loginUser };