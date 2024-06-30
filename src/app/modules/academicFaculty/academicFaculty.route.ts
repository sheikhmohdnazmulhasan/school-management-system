import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import ValidateRequest from '../../middlewares/zodValidation';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post('/create-academic-faculty', ValidateRequest(AcademicFacultyValidation.createAcademicFacultySchemaValidation), AcademicFacultyControllers.createAcademicFaculty);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:academicFacultyId', AcademicFacultyControllers.getSpecificAcademicFaculty);

router.patch('/:academicFacultyId', ValidateRequest(AcademicFacultyValidation.updateAcademicFacultySchemaValidation), AcademicFacultyControllers.updateSpecificAcademicFaculty);

export const AcademicFacultyRoutes = router;