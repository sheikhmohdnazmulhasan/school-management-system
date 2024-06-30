import express from 'express';
import { AcademicSemesterControllers } from "./semester.controller";
import ValidateRequest from '../../middlewares/zodValidation';
import { AcademicSemesterValidation } from './semester.validation';

const router = express.Router();

router.post('/create-academic-semester', ValidateRequest(AcademicSemesterValidation.createAcademicSemesterSchema), AcademicSemesterControllers.createAcademicSemester);

export const AcademicSemesterRoutes = router;
