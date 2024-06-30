import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post('/create-academic-faculty', AcademicFacultyControllers.createAcademicFaculty);

export const AcademicFacultyRoutes = router;