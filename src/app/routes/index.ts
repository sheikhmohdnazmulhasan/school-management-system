import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/semester.route";

const Routes = Router();

const moduleRoutes = [
    { path: '/users', route: UserRoutes },
    { path: '/x', route: AcademicSemesterRoutes },
];

moduleRoutes.forEach(eachRoute => Routes.use(eachRoute.path, eachRoute.route));

export default Routes;