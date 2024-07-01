import { NextFunction } from 'express';
import { Student } from './student.model';
import httpStatus from 'http-status';

const getAllStudentsFromDB = async (next: NextFunction) => {

  try {
    const result = await Student.find().populate('admissionSemester').populate({
      path: 'admissionDepartment',
      populate: { path: 'academicFaculty' }
    });

    if (result) {
      return { status: httpStatus.OK, success: true, message: 'All Students Fetched Successfully', data: result, error: null };

    };

  } catch (error) {
    next(error);

  };

}; //end

const getSingleStudentFromDB = async (id: string, next: NextFunction) => {

  try {
    // const result = await Student.aggregate([{ $match: { id } }]);
    const result = await Student.findById(id).populate('admissionSemester').populate({
      path: 'admissionDepartment',
      populate: { path: 'academicFaculty' }
    })

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
