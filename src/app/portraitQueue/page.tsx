'use client'

import '../globals.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import { getAllUnclaimed, getUserById } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../components/Portrait';
import { PortraitData } from '../portraits/components/PortraitCustomizer';
import Footer from '../components/Footer';
import { Artist } from '../components/Portrait';
import { UserData } from '../artistDashboard/[userId]/portfolio/page';
import { getUnclaimedPortraits } from '../firebase/firestore';

export default function Dashboard() {

  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [loadingPortraits, setLoadingPortraits] = useState(true)
  const [currentUser , setCurrentUser] = useState<UserData | null>(null)
  const [portraits, setPortraits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    setLoadingPortraits(true)
    
    if (!authUser?.uid) {
      return
    }
    
    // const handleGetUnclaimed = async () => {
      
    //   const unclaimed = await getAllUnclaimed();
    //   const available = unclaimed.filter(portrait => portrait.artist.filter((artist: Artist) => artist.id === authUser?.uid).length === 0)
    //   setFiltered(available)
    // }
  

    const handleCurrentUser = async () => {
     
      const latestUser: UserData | null = await getUserById(authUser?.uid)
      if (latestUser) {
        
        setCurrentUser(latestUser)
      }
    }
    
    handleCurrentUser()
    // handleGetUnclaimed()

    setLoadingPortraits(false)
  }, [authUser])

  useEffect(() => {
    const getPortraits = async () => {
        const unsubscribe = await getUnclaimedPortraits(setPortraits);
      
        return () => unsubscribe()
    }
    getPortraits()
}, [])  

useEffect(() => {
    const available = portraits.filter(portrait => portrait.artist.filter((artist: Artist) => artist.id === authUser?.uid).length === 0)
    setFiltered(available)
}, [portraits])


 
  return ((loadingPortraits || isLoading) ? 
    <p></p>
  :
  <div className='relative min-h-[100vh] bg-black'>
    <object type="image/svg+xml" data="/images/white_dots.svg" className="absolute top-[15%] left-0 w-[100%] h-auto"/>
    <object type="image/svg+xml" data="/images/customizer/portrait_queque.svg" className="absolute top-0 left-0 w-[100%] h-auto"/>
    {/* <img className="w-full fixed -top-[16px] left-0 -z-10" src="./images/customizer/portrait_queque.png" alt='background black paint drips'/> */}
    <div className='text-white min-h-screen pt-12 pb-36'>
      <div className='w-full flex justify-center items-center relative'>
        <h1 className='text-4xl text-center font-bold my-4'>Available Commissions</h1>
        {currentUser && <p className='absolute top-2 right-12 text-white text-xl'>Active: <span className='text-[#2DD42B] font-bold'>{currentUser?.activeCommissions}</span> / Max: <span className='text-red-600 font-bold'>{currentUser?.maxCommissions}</span></p>}
      </div>
      
      {currentUser?
        currentUser?.activeCommissions < currentUser?.maxCommissions 
        ? <div className='flex flex-col items-center'>
          {filtered.length === 0 ? 
            <p className='w-5/12 text-2xl text-center text-red-600 font-semibold mt-8'>No commissions available</p>
          :  filtered?.map(portrait => (
            <Portrait key={portrait.id} portrait={portrait} user={currentUser} />
          )) }
        </div>
        : <div className='flex justify-center items-center mt-10'>
            <p className='w-5/12 text-2xl text-center text-red-600 font-semibold'>You have maxed out your commission amount. Finish a commission or reach out to admin</p>
          </div>
        : <p>...</p>}

      <div className='relative z-50 w-6/12 mx-auto mb-6 text-center mt-10'>
        <Link href={`/artistDashboard/${authUser?.uid}`} className='block hover:font-semibold'>Return To Artist Dashboard</Link> 
      </div>
    </div>
    <Footer />
  </div>
  )
}
