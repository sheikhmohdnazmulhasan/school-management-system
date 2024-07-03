import express from 'express';
import ValidateRequest from '../../middlewares/zodValidation';
import { UserLoginValidation } from './auth.validation';
import { LoginUserControllers } from './auth.controller';

const router = express.Router();

router.post('/login', ValidateRequest(UserLoginValidation.userLoginValidationSchema), LoginUserControllers.loginUser);

export const UserLoginRoute = router;