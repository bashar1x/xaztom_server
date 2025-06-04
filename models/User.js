import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerify: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    codeVerify: { type: Number },
}, {
    timestamps: true
});

const User = model('User', userSchema);
export default User;

