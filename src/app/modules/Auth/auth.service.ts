import { NextFunction } from "express";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import User from "../user/user.model";
import bcrypt from 'bcrypt';


async function loginUser(payload: TLoginUser, next: NextFunction) {

    try {
        const user = await User.findOne({ id: payload.id });

        if (!user) {
            return { status: httpStatus.NOT_FOUND, success: false, message: ' Id is Invalid', data: null, error: null };

        } else if (user?.isDeleted) {
            return { status: httpStatus.FORBIDDEN, success: false, message: ' User is Deleted', data: null, error: null };

        } else if (user.status === 'blocked') {
            return { status: httpStatus.FORBIDDEN, success: false, message: ' User is Blocked', data: null, error: null };

        } else {

            // finally check the password;
            const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);

            if (!isPasswordCorrect) {
                return { status: httpStatus.UNAUTHORIZED, success: false, message: ' Wrong Password', data: null, error: null };

            } else {
                // login granted

                return { status: httpStatus.UNAUTHORIZED, success: false, message: ' login success', data: user, error: null };

            }

        };

    } catch (error) {
        next(error)
    }

};


export const LoginUserServices = { loginUser };