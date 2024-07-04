import express from 'express';
import ValidateRequest from '../../middlewares/zodValidation';
import { UserLoginValidation } from './auth.validation';
import { LoginUserControllers } from './auth.controller';

const router = express.Router();

router.post('/login', ValidateRequest(UserLoginValidation.userLoginValidationSchema), LoginUserControllers.loginUser);

router.post('/refresh-token', ValidateRequest(UserLoginValidation.refreshTokenValidationSchema),LoginUserControllers.refreshToken);

export const UserLoginRoute = router;