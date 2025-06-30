import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';

export async function POST(req) {
    try {

        await connectMongoDB();
         // แปลงข้อมูล JSON จาก request
        const { email } = await req.json();
         // ค้นหาผู้ใช้ด้วย email ในฐานข้อมูล
        const user = await User.findOne({ email }).select("_id");
        console.log("User: ", user)

        return NextResponse.json({ user })

    } catch(error) {
        return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })
    }
}