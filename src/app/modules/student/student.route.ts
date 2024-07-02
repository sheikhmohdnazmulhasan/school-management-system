import express from 'express';
import { StudentControllers } from './student.controller';
import ValidateRequest from '../../middlewares/zodValidation';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);

// router.patch('/:studentId', ValidateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);
router.patch('/:studentId', StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);


export const StudentRoutes = router;
