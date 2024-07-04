import { NextFunction } from "express";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import User from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";


async function loginUser(payload: TLoginUser, next: NextFunction) {


    try {
        const user = await User.findOne({ id: payload.id });

        console.log(user);

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
                const accessToken = jwt.sign(userPayload, (config.jwt_access_secret as string), { expiresIn: '10d' });

                if (accessToken) {

                    const refreshToken = jwt.sign(userPayload, (config.jwt_access_secret as string), { expiresIn: '365d' });

                    return { status: 200, accessToken, refreshToken, needsPasswordChange: user.needsPasswordChanges }
                }


            }

        };

    } catch (error) {
        console.log(error);
        next(error);

    };

};


async function refreshToken(refreshToken: string, next: NextFunction) {

    try {

        const decoded: JwtPayload = jwt.verify(refreshToken, (config.jwt_access_secret as string)) as JwtPayload;

        if (!decoded) {
            throw new Error('invalid refresh token,');
            // hit login again for new access token and refresh token too;

        } else {

            const user = await User.findOne({ id: decoded.id });

            if (!user) {
                throw new Error('invalid Id');

            } else if (user?.isDeleted) {
                throw new Error('User Deleted');

            } else if (user.status === 'blocked') {
                throw new Error('user Blocked');

            } else {

                const userForTokenPayload = {
                    userId: decoded.id,
                    role: decoded.role
                };

                const accessToken = jwt.sign(userForTokenPayload, (config.jwt_access_secret as string), { expiresIn: '10d' });

                if (accessToken) {
                    return { status: 200, success: true, data: accessToken }
                };

            };

        };

    } catch (error) {
        next(error);

    };

};


export const LoginUserServices = { loginUser, refreshToken };