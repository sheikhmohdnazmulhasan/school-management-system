import { NextFunction } from 'express';
import { Student } from './student.model';
import httpStatus from 'http-status';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string, next: NextFunction) => {

  try {
    const result = await Student.aggregate([{ $match: { id } }]);

    if (result) {
      return { status: httpStatus.OK, success: true, message: 'single Student Fetched Successfully', data: result, error: null };

    };

  } catch (error) {
    next(error)
  }

}; //end

const deleteStudentFromDB = async (id: string, next: NextFunction) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });

  try {

    if (result) {
      return { status: httpStatus.OK, success: true, message: 'Student Deleted Successfully', data: result, error: null };

    };

  } catch (error) {
    next(error)
  }

}; //end

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
