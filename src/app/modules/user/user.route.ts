import express from 'express';
import { userControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import ValidateRequest from '../../middlewares/zodValidation';

const router = express.Router();

router.post('/create-student', ValidateRequest(createStudentValidationSchema), userControllers.createStudent);

export const UserRoutes = router;
