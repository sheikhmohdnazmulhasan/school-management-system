import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";

function Auth() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization;

        try {

            if (!accessToken) {
                throw new Error('unauthorize access');

            };

            jwt.verify(accessToken, (config.jwt_access_secret as string), (err, decoded) => {

                if (err) {
                    throw new Error('wrong access token');

                } else {
                    req.user = (decoded as JwtPayload);

                    next();
                };

            });

        } catch (error) {
            next(error)
        }
    }
};

export default Auth