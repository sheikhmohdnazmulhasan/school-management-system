import { NextFunction } from 'express';
import { Student } from './student.model';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import User from '../user/user.model';
import { TStudent } from './student.interface';

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
    const result = await Student.findOne({ id }).populate('admissionSemester').populate({
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


// update Student;
async function updateStudentIntoDb(id: string, payload: Partial<TStudent>, next: NextFunction) {

  try {
    const result = await Student.findOneAndUpdate({ id }, payload);

    if (result) {
      return { status: httpStatus.OK, success: true, message: 'Student Updated Successfully', data: result, error: null };
    };

  } catch (error) {
    next(error);
  };

};

const deleteStudentFromDB = async (id: string, next: NextFunction) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isStudentIdValid = await User.findOne({ id });

    if (!isStudentIdValid) {
      throw new Error(`Student id is invalid (${id})`);

    };

    // firstly delete user (transition 1);
    const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

    if (!deleteUser) {
      throw new Error('User deletion failure');

    };

    // if user is successfully deleted then well delete student (transition 2);
    const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

    if (!deleteStudent) {
      throw new Error('Student deletion failure');
    };

    await session.commitTransaction();
    await session.endSession();

    return { status: httpStatus.OK, success: true, message: 'Student Deleted Successfully', data: deleteStudent, error: null };

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }

}; //end

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDb
};
