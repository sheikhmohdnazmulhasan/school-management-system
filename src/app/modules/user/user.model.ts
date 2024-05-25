import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChanges: { type: Boolean, default: true },

    role: { type: String, enum: ['admin', 'faculty', 'student'], required: true },
    status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },

    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;