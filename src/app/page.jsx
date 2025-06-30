"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
import DeleteBtn from './DeleteBtn';
import Navbar from './Navbar/Navbar';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  
  // ใช้ hook useSession เพื่อเข้าถึง session ปัจจุบัน
  const { data: session } = useSession();
  if (!session) redirect("/login");
  console.log(session)

  
  // สร้าง state ชื่อ postData และเริ่มต้นด้วยค่าว่าง
  const [postData, setPostData] = useState([]);

  console.log(postData);

  // สร้างฟังก์ชัน getPosts เพื่อดึงข้อมูลโพสต์จากเซิร์ฟเวอร์
  const getPosts = async () => {
    try { 
      // fetch data from server
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      // not ok
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      // ดึงข้อมูล response และแปลงเป็น JSON
      const data = await res.json();
      // อัพเดทข้อมูลโพสต์ใน state ด้วยข้อมูลที่ดึงมา
      setPostData(data.posts);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  }

  // เรียกใช้งาน getPosts เมื่อ component ถูก mount ครั้งแรก
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="mx-auto ">
      <Navbar className="h-screen" />
      <div className='cursor'>
        <div className="flex" style={{ marginLeft: '2cm' , marginRight:'2cm'}}>
          <button className="button-74 p-3 mt-10 text-white rounded">
            <Link href="/create">Create Post</Link>
          </button>
        </div>
      </div>
      <div className="flex" style={{ marginLeft: '2cm' ,marginRight:'2cm'}}>
      <div className="grid grid-cols-4 mt-1 gap-5">
        {postData && postData.length > 0 ? (
          postData.map(val => (
            <div key={val._id} className='background shadow-xl my-10 p-10 rounded-xl'>
              <h4 className='text-2xl'>{val.title}</h4>
              <Image 
                className='my-3 rounded-md'
                src={val.img}
                width={300}
                height={0}
                alt={val.title}
              />
              <p>{val.content}</p>
              <div className='cursor mt-5'>
                <Link className='button-24 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/edit/${val._id}`}>Edit</Link>
                <DeleteBtn id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className='bg-gray-300 p-3 mt-3'>
            You do not have any posts yet.
          </p>
        )}
        </div>
      </div>
    </main>
  );
}
