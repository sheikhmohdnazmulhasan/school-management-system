import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const route = Router();

const moduleRoutes = [
    { path: '/users', route: UserRoutes },
];

moduleRoutes.forEach(eachRoute => route.use(eachRoute.path, eachRoute.route));

export default route;