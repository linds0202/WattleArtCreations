'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import { getAllUnclaimed, getUserById } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../components/Portrait';
import { PortraitData } from '../portraits/components/PortraitCustomizer';
import Footer from '../components/Footer';

export default function Dashboard() {

  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [loadingPortraits, setLoadingPortraits] = useState(true)
  const [currentUser , setCurrentUser] = useState(null)
  const [unclaimed, setUnclaimed] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    setLoadingPortraits(true)

    const handleGetUnclaimed = async () => {
      const unclaimed = await getAllUnclaimed();
      // setUnclaimed(unclaimed)
      const available = unclaimed.filter(portrait => portrait.artist.filter(artist => artist.id === authUser?.uid).length === 0)
      setFiltered(available)
    }

    const handleCurrentUser = async () => {
      const latestUser = await getUserById(authUser?.uid)
      setCurrentUser(latestUser)
    }
    handleCurrentUser()
    handleGetUnclaimed()

    setLoadingPortraits(false)
  }, [])

 
  return ((loadingPortraits) ? 
    <p>Loading ...</p>
  :
  <div className='relative min-h-[100vh]'>
    <img className="w-full fixed -top-[16px] left-0 -z-10" src="./customizer/portrait_queque.png" />
    <div className='text-black min-h-screen pt-3 pb-36'>
      <div className='w-full flex justify-center items-center relative'>
        <h1 className='text-4xl text-center font-bold my-4'>Available Commissions</h1>
        {currentUser && <p className='absolute top-2 right-12 text-white text-xl'>Active: <span className='text-[#2DD42B] font-bold'>{currentUser?.activeCommissions}</span> / Max: <span className='text-red-600 font-bold'>{currentUser?.maxCommissions}</span></p>}
      </div>
      
      {currentUser?.activeCommissions < currentUser?.maxCommissions 
        ? <div className='flex flex-col items-center'>
          {filtered.length === 0 ? 
            <p className='w-5/12 text-2xl text-center text-red-600 font-semibold mt-8'>No commissions available</p>
          :  filtered?.map(portrait => (
            <Portrait key={portrait.uid} portrait={portrait} user={currentUser} />
          )) }
        </div>
        : <div className='flex justify-center items-center mt-10'>
            <p className='w-5/12 text-2xl text-center text-red-600 font-semibold'>You have maxed out your commission amount. Finish a commission or reach out to admin</p>
          </div>
        }

      <div className='w-6/12 mx-auto mb-6 text-center mt-10'>
        <Link href={`/artistDashboard/${authUser?.uid}`} className='block hover:font-semibold'>Return To Artist Dashboard</Link> 
      </div>
    </div>
    <Footer />
  </div>
  )
}
