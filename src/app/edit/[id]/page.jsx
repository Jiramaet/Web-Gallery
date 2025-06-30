"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'

function EditPostPage({ params }) {

    const { id } = params;

    console.log(id)

    const [postData, setPostData] = useState("");
    
    // สร้าง state สำหรับเก็บข้อมูลใหม่ของโพสต์
    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            // ใช้ fetch เพื่อดึงข้อมูลโพสต์โดยใช้ id
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {//error
                throw new Error("Failed to fetch a post");
            }

            // ดึงข้อมูล response และแปลงเป็น JSON
            const data = await res.json();
            console.log("Edit post: ", data);
            // อัพเดท state ของ postData ด้วยข้อมูลที่ได้
            setPostData(data);

        } catch(error) {
            console.log(error);
        }
    }
    // เรียกใช้งาน getPostById เมื่อ component ถูกสร้างครั้งแรก
    useEffect(() => {
        getPostById(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();// ป้องกันการโหลดหน้าเว็บใหม่โดยไม่จำเป็น

        try {
            // ส่ง request ไปยังเซิร์ฟเวอร์เพื่ออัปเดตข้อมูลโพสต์ที่มี id ที่กำหนด
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })
            })

            if (!res.ok) {
                throw new Error("Failed to update post")
            }

            router.refresh();
            router.push("/");

        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div className='container'>
    <div className='post-form'>
    <h3 className='title'>Edit Post</h3>
    <hr className='divider' />
        
        <form onSubmit={handleSubmit} className='form'>
        <input onChange={(e) => setNewTitle(e.target.value)} type="text" className='input' placeholder={postData?.post?.title} />
        <input onChange={(e) => setNewImg(e.target.value)} type="text" className='input' placeholder={postData?.post?.img} />
        <textarea onChange={(e) => setNewContent(e.target.value)} className='input' placeholder={postData?.post?.content}></textarea>
        <button type='submit' className='submit-btn'>Update Post</button>
        <Link href="/" className='go-back-btn'>Go back</Link>
        </form>
    </div>
    </div>
  )
}

export default EditPostPage