'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import { getAllUnclaimed } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../components/Portrait';

type Params = {
  params: {
    userId: string
  }
}

interface PortraitData {
  uid: String,
  styleOne: String, 
  styleTwo: String, 
  styleThree: String, 
  characters: [],
  questions: [], 
  price: Number,
  customer: String,
  artist: String,
  date: Timestamp,
  status: String,
  lastUpdatedStatus: Timestamp,
  paymentComplete: Boolean,
}

export default function Dashboard({ params: { userId }}: Params) {

  const { authUser, isLoading } = useAuth();
  const router = useRouter();


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
      const available = unclaimed.filter(portrait => portrait.artist.filter(artist => artist.id === authUser.uid).length === 0)
      setFiltered(available)
    }

    handleGetUnclaimed()
  }, [])


  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <h1 className='text-2xl text-center'>Available Commissions</h1>
    <div className='flex flex-col items-center'>
      {unclaimed.length === 0 ? 
        <p>No portraits to display</p>
      :  filtered?.map(portrait => (
        <Portrait key={portrait.uid} portrait={portrait} userId={authUser?.uid} displayName={authUser.displayName} role={authUser.roles}/>
      )) }
    </div>   
    <div className='w-6/12 mx-auto mb-6 text-center'>
      <Link href={`/artistDashboard/${authUser?.uid}`} className='block'>Return To Artist Dashboard</Link> 
    </div>
  </div>
  )
}
