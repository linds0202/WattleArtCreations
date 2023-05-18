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

  console.log('authUser in portraitQueue page is: ', authUser?.uid)

  const [unclaimed, setUnclaimed] = useState<Array<PortraitData>>([])

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
    }

    handleGetUnclaimed()
  }, [])

  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <h1 className='text-2xl text-center'>Available Commissions</h1>
    <div>
      {unclaimed.length === 0 ? 
        <p>No portraits to display</p>
      :  unclaimed?.map(portrait => (
        <Portrait key={portrait.uid} portrait={portrait} userId={authUser?.uid} />
      )) }
    </div>   
    <div>
      <Link href={`/artistDashboard/${authUser?.uid}`} className='block'>Artist Dashboard</Link> 
    </div>
  </div>
  )
}
