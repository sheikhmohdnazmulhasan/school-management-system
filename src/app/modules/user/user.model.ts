import mongoose, { Schema } from "mongoose";
// import bcrypt from 'bcrypt';
import { TUser } from "./user.interface";
// import config from "../../config";

const userSchema = new Schema<TUser>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChanges: { type: Boolean, default: true },

    role: { type: String, enum: ['admin', 'faculty', 'student'], required: true },
    status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },

    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });


// encrypting password
// userSchema.pre('save', async function (next) {
//     this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
//     console.log(await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds)));
//     next();
// });


const User = mongoose.model('User', userSchema);
export default User;