import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/semester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { StudentRoutes } from "../modules/student/student.route";

const Routes = Router();

const moduleRoutes = [
    { path: '/users', route: UserRoutes },
    { path: '/students', route: StudentRoutes },
    { path: '/academic-semester', route: AcademicSemesterRoutes },
    { path: '/academic-faculty', route: AcademicFacultyRoutes },
];

moduleRoutes.forEach(eachRoute => Routes.use(eachRoute.path, eachRoute.route));

export default Routes;