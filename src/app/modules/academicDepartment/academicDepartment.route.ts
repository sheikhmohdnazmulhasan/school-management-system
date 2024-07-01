import express from 'express';
import ValidateRequest from '../../middlewares/zodValidation';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
// import { AcademicDepartmentServices } from './academicDepartment.service';
import { AcademicDepartmentControllers } from './academicDepartment.controller';


const router = express.Router();

router.post('/create-academic-department', ValidateRequest(AcademicDepartmentValidation.createAcademicDepartmentSchemaValidation), AcademicDepartmentControllers.createAcademicDepartment);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router.get('/:academicDepartmentId', AcademicDepartmentControllers.getSpecificAcademicDepartment);

router.patch('/:academicDepartmentId', ValidateRequest(AcademicDepartmentValidation.updateAcademicDepartmentSchemaValidation), AcademicDepartmentControllers.updateSpecificAcademicDepartment);

export const AcademicDepartmentRoutes = router;