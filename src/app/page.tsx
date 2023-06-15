'use client'

import Link from 'next/link';
import "./globals.css";
import MainHome from './components/MainHome';

export default function Home() {
  return (
    <main className=" h-[90vh] p-24 bg-white text-black flex flex-col justify-center items-center">
      <div className='flex justify-between items-center w-8/12 m-auto text-3xl text-black'>
        <Link href='/personal'>Personal</Link>
        <img src='./Logo_Full_ups.png' className='w-4/12'/>
        <Link href='/corporate'>Corporate</Link>
        
      </div>
      <MainHome />
    </main>
  )
}
