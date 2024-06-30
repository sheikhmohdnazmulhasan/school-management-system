import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import ValidateRequest from '../../middlewares/zodValidation';
import { AcademicSemesterValidation } from '../academicSemester/semester.validation';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post('/create-academic-faculty', ValidateRequest(academicFacultyValidation.createAcademicFacultySchemaValidation), AcademicFacultyControllers.createAcademicFaculty);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:academicFacultyId', AcademicFacultyControllers.getSpecificAcademicFaculty);

export const AcademicFacultyRoutes = router;