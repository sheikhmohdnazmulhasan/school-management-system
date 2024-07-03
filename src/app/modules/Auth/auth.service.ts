import { NextFunction } from "express";
import { TLoginUser } from "./auth.interface";


async function loginUser(payload: TLoginUser, next: NextFunction) {

    return 'ok'

};


export const LoginUserServices = { loginUser };