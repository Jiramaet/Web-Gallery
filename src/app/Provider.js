// เรียกใช้งานโมดูล 'next-auth/react'
"use client"

// นำเข้า SessionProvider จากโมดูล 'next-auth/react'
import { SessionProvider } from "next-auth/react"

// สร้างคอมโพเนนต์ AuthProvider ที่รับ children เข้ามา
export const AuthProvider = ({ children }) => {
    // ให้ AuthProvider คืนค่า SessionProvider และใส่ children ลงไป
    return <SessionProvider>{ children }</SessionProvider>
}
