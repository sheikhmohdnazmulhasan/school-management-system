import { NextFunction } from 'express';
import { Student } from './student.model';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import User from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../Builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>, next: NextFunction) => {
  // const queryObj = { ...query };

  // let searchTerm: string = '';
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // };

  // // searching
  // const searchResult = Student.find({
  //   $or: ['name.firstName', 'email', 'presentAddress'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' }
  //   }))

  // });

  // // filtrating
  // const excludeFields: string[] = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach(ele => delete queryObj[ele]);

  // console.log({ query }, { queryObj });

  // const filterResult = searchResult.find(queryObj).populate('admissionSemester').populate({
  //   path: 'admissionDepartment',
  //   populate: { path: 'academicFaculty' }
  // });

  // // shorting
  // let sort: string = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;

  // };

  // const sortResult = filterResult.sort(sort);

  // // pagination;
  // let page: number = 1;
  // let limit: number = 1;
  // let skip: number = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);

  // };

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // };

  // const paginationFilter = sortResult.skip(skip);


  // // fields filtering;
  // let fields = "-__v";

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');

  // };

  // const limitQ = paginationFilter.limit(limit);
  const searchableFields: string[] = ['name.firstName', 'email', 'presentAddress']

  const searchResults = new QueryBuilder(Student.find().populate({
    path: 'admissionDepartment',
    populate: { path: 'academicFaculty' }
  }), query).search(searchableFields).filter().sort().paginate().fields();

  try {
    // const result = await limitQ.select(fields);

    const result = await searchResults.modelQuery;

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
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const modifiedDataForDatabase: Record<string, unknown> = { ...remainingData }


  if (name && Object.keys(name).length) {

    for (const [key, value] of Object.entries(name)) {
      modifiedDataForDatabase[`name.${key}`] = value;
    };

  }

  if (localGuardian && Object.keys(localGuardian).length) {

    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedDataForDatabase[`localGuardian.${key}`] = value;
    };

  };

  if (guardian && Object.keys(guardian).length) {

    for (const [key, value] of Object.entries(guardian)) {
      modifiedDataForDatabase[`guardian.${key}`] = value;
    };

  };

  try {
    const result = await Student.findOneAndUpdate({ id }, modifiedDataForDatabase, { new: true });

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
