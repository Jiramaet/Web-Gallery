"use client"
import React, {useState} from 'react'
import Navbar from '../Navbar/Navbar'
import Link from 'next/link'


function RegisterPage() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();//กันไม่ให้โหลดหน้าใหม่

        if(password != confirmPassword){
            setError("Password do not match!");
            return;
        }

        if(!name || !email || !password || !confirmPassword){
            setError("Please complete all inputs!");
            return;
        }

        // ส่วนของการตรวจสอบว่ามีผู้ใช้นี้อยู่แล้วหรือไม่
        const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })// ส่งข้อมูล email เป็น JSON ไปยังเซิร์ฟเวอร์
            })

            // ดึงข้อมูลผู้ใช้จาก response
            const { user } = await resCheckUser.json();

            if (user) { 
            setError("User already exists.");
            return;
            }

        try {
            // ส่วนของการลงทะเบียนผู้ใช้ใหม่
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok) {
                // รีเซ็ตค่า error และแสดงข้อความ success
                const form = e.target;
                setError("");
                setSuccess("User registration successfully!");
                form.reset();
            } else {
                console.log("User registration failed.")
            }

        } catch(error) {
            console.log("Error during registration: ", error)
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='video-background'>
        <video autoPlay loop muted>
            <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion.webm" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className='reg-container'>
            <h3 className='tcolor text-3xl' >Register Page</h3>
            <hr className='my-3'/>
            <form onSubmit={handleSubmit}>

                {error && (
                    <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}

                {success && (
                    <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                        {success}
                    </div>
                )}
                
                <input onChange={(e) => setName(e.target.value)} className='input-reg'type="text" placeholder='Enter your name' />
                <input onChange={(e) => setEmail(e.target.value)} className='input-reg' type="email" placeholder='Enter your email' />
                <input onChange={(e) => setPassword(e.target.value)} className='input-reg' type="password" placeholder='Enter your password' />
                <input onChange={(e) => setConfirmPassword(e.target.value)} className='input-reg' type="password" placeholder='Enter your password' />
                <button type='Submit' className='submit-reg'>Sign Up</button>
            </form>
            <hr className='my-3'/>
            <div className='tcolor'><p>Do not have a an account? go to <Link className='login-button' href="/login">Login</Link> Page</p></div>
        </div>
        </div>
    </div>
  )
}

export default RegisterPage