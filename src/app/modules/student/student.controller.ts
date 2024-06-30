import { NextFunction, Request, Response } from "express";
import { UserServices } from "../user/user.services";
import { StudentServices } from "./student.service";

// async function createStudent(req: Request, res: Response) {
//   const { password, student } = req.body;

//   try {
//     const result = await UserServices.createStudentIntoDb(password, student);

//     res.status(200).json({
//       success: true
//     })

//   } catch (error) {
//     console.log(error);
//   }

// }

async function getSingleStudent(req: Request, res: Response, next: NextFunction) {

  try {
    const result = await StudentServices.getSingleStudentFromDB(req.params.studentId, next);

    if (result) {
      res.status(result.status).json({
        success: result.success,
        message: result.message,
        data: result.data,
        error: result.error
      });
    };

  } catch (error) {

  };

}; //end

async function deleteStudent(req: Request, res: Response, next: NextFunction) {

  try {
    const result = await StudentServices.deleteStudentFromDB(req.params.studentId, next);

    if (result) {
      res.status(result.status).json({
        success: result.success,
        message: result.message,
        data: result.data,
        error: result.error
      });
    };

  } catch (error) {

  }
}

export const StudentControllers = { getSingleStudent, deleteStudent };
