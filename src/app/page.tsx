import Link from 'next/link';
import "./globals.css";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
      <h1>Initial Landing Page</h1>
      <div className='flex justify-between w-6/12 m-auto text-3xl text-black'>
        <Link href='/personal'>Personal</Link>
        <Link href='/corporate'>Corporate</Link>
      </div>
    </main>
  )
}
