'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import { getAllUnclaimed, getUserById } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../components/Portrait';
import { PortraitData } from '../portraits/components/PortraitCustomizer';

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
    const handleGetUnclaimed = async () => {
      const unclaimed = await getAllUnclaimed();
      setUnclaimed(unclaimed)
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
  <div className='bg-white text-black min-h-screen pt-3'>
    <div className='w-full flex justify-center items-center relative'>
      <h1 className='text-2xl text-center'>Available Commissions</h1>
      {currentUser && <p className='absolute top-2 right-10'>Active: <span className='text-[#2DD42B] font-bold'>{currentUser?.activeCommissions}</span> / Max: <span className='text-red-600 font-bold'>{currentUser?.maxCommissions}</span></p>}
    </div>
    
    {currentUser?.activeCommissions < currentUser?.maxCommissions 
      ? <div className='flex flex-col items-center'>
        {unclaimed.length === 0 ? 
          <p>No portraits to display</p>
        :  filtered?.map(portrait => (
          <Portrait key={portrait.uid} portrait={portrait} user={currentUser} />
        )) }
      </div>
      : <div className='flex justify-center items-center mt-10'>
          <p className='w-6/12 text-center'>You have maxed out your commission amount. Finish a commission or reach out to admin</p>
        </div>
      }

    <div className='w-6/12 mx-auto mb-6 text-center mt-10'>
      <Link href={`/artistDashboard/${authUser?.uid}`} className='block'>Return To Artist Dashboard</Link> 
    </div>
  </div>
  )
}
