'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getArtistsPortraits } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '@/app/components/Portrait';
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';

type Params = {
  params: {
    userId: string
  }
}

export default function ArtistDashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [myPortraits, setMyPortaits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    const handleGetPortraits = async () => {
      const getMyPortraits = await getArtistsPortraits(authUser?.displayName, authUser?.uid);
      setMyPortaits(getMyPortraits)
      setFiltered(getMyPortraits)
    }

    handleGetPortraits()
  }, [])

  const handleFilter= (filter: string) => {
    
    if(filter === 'Bid') {
      const filteredPortraits = myPortraits.filter(portrait => !portrait.artistAssigned)

      setFiltered(filteredPortraits)
    }
    if(filter === 'In Progress') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.artistAssigned)

       setFiltered(filteredPortraits)
    }
    if(filter === 'Completed') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'Complete')
      setFiltered(filteredPortraits)
    }
    if(filter === 'Clear') {
      setFiltered(myPortraits)
    }
  }



  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <h1 className='text-2xl text-center'>Artist Dashboard</h1>
    
    <button 
      onClick={() => handleFilter('Bid')} 
      className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
    >
      Bid
    </button>
    <button 
      onClick={() => handleFilter('In Progress')} 
      className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
    >
      In Progress
    </button>
    <button 
      onClick={() => handleFilter('Completed')} 
      className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
    >
      Completed
    </button>
    <button 
      onClick={() => handleFilter('Clear')} 
      className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
    >
      Clear
    </button>
    
    <div className='flex flex-col items-center'>
      {myPortraits.length === 0 ? 
        <p>No portraits to display</p>
      :  filtered?.map(portrait => (
        <Portrait key={portrait.uid} portrait={portrait} userId={userId} displayName={authUser.displayName} role={authUser.roles}/>
      )) }
    </div>   
    <div className='w-6/12 mx-auto mb-6 text-center'>
      <Link href='/portraitQueue' className='block'>Return to Portrait Queue</Link> 
    </div>
  </div>
  )
}