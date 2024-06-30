import express from 'express';
import { AcademicSemesterControllers } from "./semester.controller";
import ValidateRequest from '../../middlewares/zodValidation';
import { AcademicSemesterValidation } from './semester.validation';

const router = express.Router();

// create new academic semester
router.post('/create-academic-semester', ValidateRequest(AcademicSemesterValidation.createAcademicSemesterSchema), AcademicSemesterControllers.createAcademicSemester);

// get all academic semesters by id
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

// get specific academic semester
router.get('/:semesterId', AcademicSemesterControllers.getSpecificSemester);

// update specific academic semester by id;
router.patch('/:semesterId',ValidateRequest(AcademicSemesterValidation.UpdateAcademicSemesterSchema) , AcademicSemesterControllers.updateSpecificSemester)


export const AcademicSemesterRoutes = router;
