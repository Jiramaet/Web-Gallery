import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    // รับข้อมูลจาก request และแปลงเป็น JSON
    const { title, img, content } = await req.json();
    console.log(title, img, content)
    await connectMongoDB();
    await Post.create({ title, img, content });// สร้างโพสต์ใหม่ในฐานข้อมูล
    return NextResponse.json({ message: "Post created"}, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const posts = await Post.find({});// ดึงโพสต์ทั้งหมดจากฐานข้อมูล
    return NextResponse.json({ posts });  // ส่งข้อมูลโพสต์กลับไปยัง client ในรูปแบบ JSON พร้อมกับสถานะ 200 (OK)
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id"); // รับค่า id ของโพสต์ที่ต้องการลบจาก URL query parameters
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}