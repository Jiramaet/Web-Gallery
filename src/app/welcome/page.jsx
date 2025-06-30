"use client"

import Image from "next/image";
import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import NextLogo from '../../../public/next.svg'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from 'next/link'


export default function Home() {

    const { data: session } = useSession();
    //ถ้ายังไม่ได้ login ให้กลับไปที่หน้า home
    if (!session) redirect("/login");
    console.log(session)

  return (
    <main>
      <Container className="HomePage">
        <Navbar session={session} />
        <div className="background-video-container">
          <video autoPlay muted loop className="background-video">
            <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center text-center p-10">
          <h3 className="text-5xl font-bold text-white">Welcome, {session?.user?.name}</h3>
          <p className="text-2l mt-3 text-white">Your email address: {session?.user?.email}</p>
          <p className="text-2l mt-3 text-white">Your user role: {session?.user?.role}</p>
          <p className="text-2sm mt-3 text-white">Lorem ipsum dolor sit amet consectetur nisi minima, </p>
          <button className="button-29 mt-5">
            <Link href="/">HomePage</Link>
          </button>
        </div>
        <Footer />
      </Container>
    </main>
  );
}