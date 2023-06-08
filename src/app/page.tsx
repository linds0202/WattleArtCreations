import Link from 'next/link';
import "./globals.css";

export default function Home() {
  
  return (
    <main className=" h-[90vh] p-24 bg-white text-black">
      <div className='flex justify-between items-center w-8/12 m-auto text-3xl text-black'>
        <Link href='/personal'>Personal</Link>
        <img src='./Logo_Full_ups.png' className='w-4/12'/>
        <Link href='/corporate'>Corporate</Link>
      </div>
    </main>
  )
}
