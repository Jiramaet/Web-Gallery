import mongoose, { Schema } from "mongoose";

// สร้าง Schema สำหรับโพสต์ (Post)
const postSchema = new Schema(
    {
        title: String, // ฟิลด์เก็บชื่อของโพสต์เป็นประเภท String
        img: String, // ฟิลด์เก็บ URL ของรูปภาพเป็นประเภท String
        content: String, // ฟิลด์เก็บเนื้อหาของโพสต์เป็นประเภท String
    },
    {
        timestamps: true
    }
)
// สร้างโมเดล Post โดยใช้ Schema ที่สร้างไว้ข้างบน
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;