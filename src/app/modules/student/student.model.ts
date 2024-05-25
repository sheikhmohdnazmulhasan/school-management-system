import { Schema, model, Types } from 'mongoose';

const UserNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true }
});

const GuardianSchema = new Schema({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true }
});

const LocalGuardianSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true }
});

const StudentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  password: { type: String, required: true },
  name: { type: UserNameSchema, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String },
  isDeleted: { type: Boolean, required: true, default: false },
  
}, { timestamps: true });

export const Student = model('Student', StudentSchema);
