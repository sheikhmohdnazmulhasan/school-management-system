import express from 'express';
import { AcademicSemesterControllers } from "./semester.controller";
import ValidateRequest from '../../middlewares/zodValidation';
import { AcademicSemesterValidation } from './semester.validation';

const router = express.Router();

// create new academic semester
router.post('/create-academic-semester', ValidateRequest(AcademicSemesterValidation.createAcademicSemesterSchema), AcademicSemesterControllers.createAcademicSemester);

// get all academic semesters
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);


export const AcademicSemesterRoutes = router;
