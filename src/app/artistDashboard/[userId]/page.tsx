'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getArtistsPortraits } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '@/app/components/Portrait';

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

export default function ArtistDashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [myPortraits, setMyPortaits] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    const handleGetPortraits = async () => {
      const getMyPortraits = await getArtistsPortraits(userId);
      setMyPortaits(getMyPortraits)
    }

    handleGetPortraits()
  }, [])

  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <h1 className='text-2xl text-center'>Artist Dashboard</h1>
    <div className='flex flex-col items-center'>
      {myPortraits.length === 0 ? 
        <p>No portraits to display</p>
      :  myPortraits?.map(portrait => (
        <Portrait key={portrait.uid} portrait={portrait} userId={userId} role={authUser.roles}/>
      )) }
    </div>   
    <div className='w-6/12 mx-auto mb-6 text-center'>
      <Link href='/portraitQueue' className='block'>Return to Portrait Queue</Link> 
    </div>
  </div>
  )
}