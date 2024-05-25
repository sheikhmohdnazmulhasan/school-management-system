import { Request, Response } from "express";
import { UserServices } from "../user/user.services";

async function createStudent(req: Request, res: Response) {
  const { password, student } = req.body;

  try {

    const result = await UserServices.createStudentIntoDb(password, student);

    res.status(200).json({
      success: true
    })

  } catch (error) {
    console.log(error);
  }

}

export const StudentControllers = {};
