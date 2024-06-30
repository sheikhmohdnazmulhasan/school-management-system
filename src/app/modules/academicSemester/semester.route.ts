import express from 'express';
import { AcademicSemesterControllers } from "./semester.controller";

const router = express.Router();

router.post('/create-academic-semester', AcademicSemesterControllers.createAcademicSemester);

export const AcademicSemesterRoutes = router;
