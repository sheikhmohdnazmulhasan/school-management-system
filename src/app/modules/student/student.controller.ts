import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";


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
    next(error);
  };

}; //end

async function getAllStudents(req: Request, res: Response, next: NextFunction) {

  try {
    const result = await StudentServices.getAllStudentsFromDB(next);

    if (result) {
      res.status(result.status).json({
        success: result.success,
        message: result.message,
        data: result.data,
        error: result.error
      });
    };

  } catch (error) {
    next(error);
  };

}; //end

export const StudentControllers = { getSingleStudent, deleteStudent, getAllStudents };
