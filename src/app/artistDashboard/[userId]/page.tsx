'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getArtistsPortraits, getUserById } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '@/app/components/Portrait';
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';
import { UserData } from './portfolio/page';
import Footer from '@/app/components/Footer';

type Params = {
  params: {
    userId: string
  }
}

export default function ArtistDashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [currentUser , setCurrentUser] = useState(null)
  const [myPortraits, setMyPortaits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    let latestUser

    const handleGetPortraits = async () => {
      const getMyPortraits = await getArtistsPortraits(latestUser?.artistName, authUser?.uid);
      setMyPortaits(getMyPortraits)
      setFiltered(getMyPortraits)
    }
    
    const handleCurrentUser = async () => {
      latestUser = await getUserById(authUser?.uid)
      setCurrentUser(latestUser)
      handleGetPortraits()
    }

    handleCurrentUser()
  }, [])

  const handleFilter= (filter: string) => {
    
    if(filter === 'Bid') {
      const filteredPortraits = myPortraits.filter(portrait => !portrait.artistAssigned)

      setFiltered(filteredPortraits)
    }
    if(filter === 'In Progress') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.artistAssigned && portrait.status !== 'Completed')

       setFiltered(filteredPortraits)
    }
    if(filter === 'Completed') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'Completed')
      setFiltered(filteredPortraits)
    }
    if(filter === 'Clear') {
      setFiltered(myPortraits)
    }
  }



  return ((!authUser || isLoading) ? 
    <p>Loading ...</p>
  :
  <div className='relative min-h-[100vh]'>
    <img className="w-[101%] absolute -top-[16px] left-0 -z-10" src="../customizer/customizer.png" />
    <div className='text-black min-h-screen pt-3 relative pb-36'>
        <h1 className='text-4xl text-center font-bold my-8'>Artist Dashboard</h1>
        {currentUser && <p className='absolute top-4 right-14 text-white text-xl'>Active: <span className='text-[#2DD42B] font-bold'>{currentUser?.activeCommissions}</span> / Max: <span className='text-red-600 font-bold'>{currentUser?.maxCommissions}</span></p>}
        
        <div className='w-10/12 mx-auto flex justify-around items-center'>
          <button 
            onClick={() => handleFilter('Bid')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Bid
          </button>
          <button 
            onClick={() => handleFilter('In Progress')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            In Progress
          </button>
          <button 
            onClick={() => handleFilter('Completed')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Completed
          </button>
          <button 
            onClick={() => handleFilter('Clear')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Clear
          </button>
        </div>
        
        
        <div className='mt-4 flex flex-col items-center'>
          {filtered.length === 0 ? 
            <p className='text-2xl font-bold mt-8'>No portraits to display</p>
          :  filtered?.map(portrait => (
            <Portrait key={portrait.uid} portrait={portrait} user={currentUser} />
          )) }
        </div>
      </div>
    <Footer />
  </div>
  
  )
}