import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { // ฟิลด์ name มีประเภท String และจำเป็นต้องมีค่า
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: { // ฟิลด์ role มีประเภท String และไม่จำเป็นต้องมีค่า (default: "user")
            type: String,
            required: false,
            default: "user"
        },
    },
    { timestamps: true }
)
// สร้างโมเดล User โดยใช้ Schema userSchema ที่กำหนดไว้ก่อนหน้านี้
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;